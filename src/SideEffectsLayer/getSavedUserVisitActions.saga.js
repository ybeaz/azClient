import { takeEvery, call } from 'redux-saga/effects'

import { fetchPost } from '../ComminicationLayer/fetch'

function* getSavedUserVisitActions(payload) {
  const endpoint = 'https://nd.userto.com/api/apiP2p'
  // Unused API, but working: const endpoint = 'https://userto.com/api/apiP2p.php'
  // console.info('getSavedUserVisitActions [0]', JSON.stringify(payload))
  try {
    const response = yield fetchPost(endpoint, payload)

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
