import { all, fork } from 'redux-saga/effects'

import getSavedUserVisitActionsWatcher from './getSavedUserVisitActions.saga'
import getStartedUserSessionWatcher from './getStartedUserSession.saga'

export default function* indexSaga() {
  yield all([
    fork(getSavedUserVisitActionsWatcher),
    fork(getStartedUserSessionWatcher),
  ])
}
