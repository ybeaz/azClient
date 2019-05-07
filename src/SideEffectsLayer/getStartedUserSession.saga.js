import { takeEvery, call } from 'redux-saga/effects'

import { fetchGet } from '../ComminicationLayer/fetch'

function* getStartedUserSession(payload) {
  const endpoint = 'https://nd.userto.com/api/apiP2p'
  // Unused API, but working: const endpoint = 'https://userto.com/api/apiP2p.php'
  // console.info('getStartedUserSession [0]', { payload })
  try {
    const response = yield fetchGet(endpoint, payload)
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
