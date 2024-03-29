import { select, put, takeEvery, call } from 'redux-saga/effects'
import axios from 'axios'

import { COOKIE_ANALYTICSID_NAME } from '../Constants/cookieAnalyticsIDName'
import { cookie } from '../Shared/cookie'
import { IAnalyticsInput } from '../Interfaces/IAnalyticsInput'
import { getSavedAnalyticsConnector } from '../ComminicationLayer/getSavedAnalytics.connector'
import * as action from '../DataLayer/index.action'

interface IGetSavedAnalytics {
  type: string
  data: IAnalyticsInput
}

function* getSavedAnalytics(payload: IGetSavedAnalytics) {
  const {
    data: { initData, event },
  } = payload

  const { analyticsID: analyticsIDStore } = yield select(store => store)

  try {
    const {
      method,
      options,
      url,
      payload: payloadNext,
    } = getSavedAnalyticsConnector({
      ...(analyticsIDStore &&
        analyticsIDStore !== 'null' && { analyticsID: analyticsIDStore }),
      ...(initData && { initData }),
      ...(event && { event }),
    })

    const {
      data: {
        data: {
          saveAnalytics: { analyticsID },
        },
      },
    } = yield axios[method](url, payloadNext, options)

    yield put(action.SAVE_ANALYTICS.SUCCESS({ analyticsID }))

    if (analyticsID && analyticsID !== 'null') {
      const { hostname } = location
      cookie.set(COOKIE_ANALYTICSID_NAME, analyticsID, {
        domain: hostname,
        days: 0.5,
      })
    }
  } catch (error) {
    yield call(() => {})
  }
}

export default function* getSavedAnalyticsWatcher() {
  yield takeEvery(action.SAVE_ANALYTICS.REQUEST().type, getSavedAnalytics)
}
