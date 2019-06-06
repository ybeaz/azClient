import { takeEvery, call } from 'redux-saga/effects'

import { fetchPost } from '../ComminicationLayer/fetch'

function* getStartedUserSession(payload) {
  const { endpoint } = payload
  const payloadNext = payload
  delete payloadNext.endpoint
  delete payloadNext.type
  // console.info('getStartedUserSession [0]', { payload })
  try {
    const response = yield fetchPost(endpoint, payloadNext)
    const data = yield response.json()
    // console.info('getStartedUserSession.saga.js [7]', { data })
  }
  catch (error) {
    yield call(() => {})
  }
}

export default function* getStartedUserSessionWatcher() {
  // console.info('getSavedUserVisitActionsMdbWatcher START_USER_SESSION', )
  yield takeEvery(['START_USER_SESSION_REQUEST'],
    getStartedUserSession)
}
