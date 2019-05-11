import { combineReducers } from 'redux'
import * as Interfaces from '../../Shared/interfaces'

const userFootprint: any = (
  state: Interfaces.UserFootprint = {utAnltSid: ''},
  action: Interfaces.Action
): Interfaces.UserFootprint => {

  let stateNext: Interfaces.UserFootprint = {
    utAnltSid: '',
    initData: [],
    topics: [],
    actions: [],
    inpData: [],
    target: [],
  }

  switch (action.type) {

    case 'UPDATE_USER_FOOTPRINT': {

      stateNext = { ...stateNext, ...state, ...action }
      // console.info(`reducer->userFootprint type: ${action.type}`, { stateNext, state, action })

      return stateNext
    }

    default: {
      return state
    }
  }
}

const actionLog: any = (state: any = [], action: Interfaces.Action): any => {

  switch (action.type) {

    case 'DISPATCH_ACTION': {
      const { payload } = action

      return [...state, payload]
      // console.info('actionLog->statePrev', { action, statePrev: state, stateNext })
    }

    default: {
      return state
    }
  }
}

// Main application reducers
// tslint:disable-next-line: export-name
const appCombineReducers = combineReducers(
  {
    userFootprint,
    actionLog,
  },
)

export default appCombineReducers
