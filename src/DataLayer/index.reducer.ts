import { IRootStore } from '../Interfaces/IRootStore'

import { rootStoreDefault } from './rootStoreDefault'
import { TEMPLATE } from './reducers/TEMPLATE'
import { SAVE_ANALYTICS_SUCCESS } from './reducers/SAVE_ANALYTICS_SUCCESS'
import { UPDATE_USER_FOOTPRINT } from './reducers/UPDATE_USER_FOOTPRINT'
import { DISPATCH_ACTION } from './reducers/DISPATCH_ACTION'

export const rootReducer: Function = (
  store: IRootStore = rootStoreDefault,
  action: any
): any => {
  const { type, data } = action

  const output = {
    SAVE_ANALYTICS_SUCCESS,
    UPDATE_USER_FOOTPRINT,
    DISPATCH_ACTION,
  }

  return output[type] ? output[type](store, data) : store
}
