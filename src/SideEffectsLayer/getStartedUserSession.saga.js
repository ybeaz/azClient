import { takeEvery, call } from 'redux-saga/effects'

import * as action from '../DataLayer/index.action'
import { fetchPost } from '../ComminicationLayer/fetch'

function* getStartedUserSession({ data }) {
  const { endpoint, type, ...payload } = data
  try {
    const response = yield fetchPost(endpoint, payload)
    const data = yield response.json()
  } catch (error) {
    yield call(() => {})
  }
}

export default function* getStartedUserSessionWatcher() {
  yield takeEvery(
    [action.START_USER_SESSION.REQUEST().type],
    getStartedUserSession
  )
}
