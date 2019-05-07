import { all, fork } from 'redux-saga/effects'

import getUserAnalyticsDataWatcher from './getUserAnalyticsData.saga'
import getSavedUserVisitActionsWatcher from './getSavedUserVisitActions.saga'
import getStartedUserSessionWatcher from './getStartedUserSession.saga'

export default function* indexSaga() {
  yield all([
    fork(getUserAnalyticsDataWatcher),
    fork(getSavedUserVisitActionsWatcher),
    fork(getStartedUserSessionWatcher),
  ])
}
