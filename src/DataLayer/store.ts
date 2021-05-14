import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { loggerDispatch } from './middleware'
import { rootReducer } from './index.reducer'
import indexSaga from '../SideEffectsLayer/index.saga'

const configureStore = (rootReducer): any => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware, loggerDispatch]
  //[ middleware.logger, middleware.logger, middleware.crashReporter ]
  const store = createStore(rootReducer, applyMiddleware(...middlewares))
  //console.info('index.js->configureStore', indexSaga)
  sagaMiddleware.run(indexSaga)
  return store
}

export const store = configureStore(rootReducer)
