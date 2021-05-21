import { select, put, takeEvery, call } from 'redux-saga/effects'
import axios from 'axios'

import { IAnalyticsInput } from '../Interfaces/IAnalyticsInput'
import { getSavedAnalyticsConnector } from '../ComminicationLayer/getSavedAnalytics.connector'
import * as action from '../DataLayer/index.action'

interface IGetSavedAnalytics {
  type: string
  data: IAnalyticsInput
}

function* getSavedAnalytics(payload: IGetSavedAnalytics) {
  const {
    data: { initData, topic, event, target },
  } = payload

  const { analyticsID } = yield select(store => store)

  try {
    const {
      method,
      options,
      url,
      payload: payloadNext,
    } = getSavedAnalyticsConnector({
      ...(analyticsID && { analyticsID }),
      initData,
      topic,
      event,
      target,
    })

    const {
      data: {
        data: { saveAnalytics },
      },
    } = yield axios[method](url, payloadNext, options)
    yield put(action.SAVE_ANALYTICS.SUCCESS(saveAnalytics))
  } catch (error) {
    yield call(() => {})
  }
}

export default function* getSavedAnalyticsWatcher() {
  // console.info('getSavedAnalytics SAVE_ANALYTICS', )
  yield takeEvery(action.SAVE_ANALYTICS.REQUEST().type, getSavedAnalytics)
}
