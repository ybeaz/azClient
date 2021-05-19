import { all, fork } from 'redux-saga/effects'

import getSavedAnalyticsWatcher from './getSavedAnalytics.saga'

export default function* indexSaga() {
  yield all([fork(getSavedAnalyticsWatcher)])
}
