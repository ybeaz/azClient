import { takeEvery, call } from 'redux-saga/effects'
import axios from 'axios'

import * as action from '../DataLayer/index.action'
import { fetchPost } from '../ComminicationLayer/fetch'

function* getSavedAnalytics(payload) {
  // const { endpoint } = payload
  // const payloadNext = payload
  // delete payloadNext.endpoint
  // delete payloadNext.type
  console.info('getSavedAnalytics [12]', { payload })
  try {
    const method = 'post'
    const url = 'http://127.0.0.1:8082/graphql'
    const payloadNext = {
      operationName: 'SaveAnalytics',
      variables: {
        analyticsInput: {
          hash256: 'String',
          initData: {
            width: 1000,
            height: 500,
            search: 'String',
            pathname: 'String',
            hostname: 'String',
            href: 'String',
            referrer: 'String',
          },
        },
      },
      query:
        'mutation SaveAnalytics($analyticsInput: AnalyticsInput!){saveAnalytics(analyticsInput: $analyticsInput){ analyticsID, hash256, dateCreate, dateUpdate, initData { ...InitDataAll } }} fragment InitDataAll on InitData { width, height, search, pathname, hostname, href, referrer }',
    }
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      timestamp: +new Date(),
    }
    const options = { headers: { ...headers } }

    console.info('getSavedAnalytics [42]', {
      method,
      url,
      payloadNext,
      options,
    })
    const {
      data: {
        data: { saveAnalytics },
      },
    } = yield axios[method](url, payloadNext, options)

    // const response = yield fetchPost(endpoint, payloadNext)
    // const data = yield response.json()
    console.info('getSavedAnalytics [46]', { saveAnalytics })
  } catch (error) {
    yield call(() => {})
  }
}

export default function* getSavedAnalyticsWatcher() {
  // console.info('getSavedAnalytics SAVE_ANALYTICS', )
  yield takeEvery(action.SAVE_ANALYTICS.REQUEST().type, getSavedAnalytics)
}
