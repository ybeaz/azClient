import { takeEvery, call } from 'redux-saga/effects'

import { fetchPost } from '../ComminicationLayer/fetch'

function* getSavedUserVisitActions(payload) {
  const { endpoint } = payload
  const payloadNext = payload
  delete payloadNext.endpoint
  delete payloadNext.type
  console.info('getSavedUserVisitActions [0]', { payload, 'JSON.stringify(payload)': JSON.stringify(payload) })
  try {
    const response = yield fetchPost(endpoint, payloadNext)

    const data = yield response.json()
    // console.info('getUserAnalyticsData [7]', { data })
  }
  catch (error) {
    yield call(() => {})
  }
}

export default function* getSavedUserVisitActionsWatcher() {
  // console.info('getSavedUserVisitActionsMdbWatcher SAVE_USER_VISIT_ACTIONS', )
  yield takeEvery(['SAVE_USER_VISIT_ACTIONS_REQUEST'],
    getSavedUserVisitActions)
}
