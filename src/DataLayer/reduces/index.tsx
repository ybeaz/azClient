import { combineReducers } from 'redux'
import * as Interfaces from '../../Shared/interfaces'

interface UserFootprint {
  inception: string,
    /* 'registrationQuick', 'registrationFooter', 'registrationNavBar',
        'searchButtonFirst', 'searchButtonSecond', 'catalogCategory', 'userProfile'
    */
  searchPhrase?: string,
  searchCategory?: string[],
  searchMedia?: string[],
  catalogCategory?: string,
  userPrifile?: string,
  email?: string,
  role?: string[],
  msg?: string,
}

const userFootprint: any = (state: object = {}, action: Interfaces.Action): object => {

  let stateNext: UserFootprint = {
    role: [],
    msg: '',
    inception: '',
    searchPhrase: '',
    searchCategory: [],
    searchMedia: [],
    catalogCategory: '',
    userPrifile: '',
    email: '',
  }

  switch (action.type) {

    case 'UPDATE_USER_FOOTPRINT': {

      stateNext = { ...stateNext, ...state, ...action }
      //console.info(`reducer->userFootprint type: ${action.type}`, { stateNext, state, action })

      return stateNext
    }

    default: {
      return state
    }
  }
}

const analytics: any = (state: any = [], action: Interfaces.Action): any => {
  switch (action.type) {
    case 'GET_USER_ANALYTICS_DATA_SUCCESS': {
      const stateNext: any = action.data.filter((item: any) => item.PHPSESSID)
      // console.info(`reducer->analytics type: ${action.type}`, { stateNext, state, action })
      return stateNext
    }

    default: {
      return state
    }
  }
}

const language: any = (state: string = 'rus', action: Interfaces.Action): any => {

  switch (action.type) {
    case 'SELECT_LANGUAGE': {
      // console.info(`reducer->language type: ${action.type}`, { state, action })

      return action.lang
    }

    default: {
      return state
    }
  }
}

const user: any = (state: object = {}, action: Interfaces.Action): object => {

  switch (action.type) {
    case 'REG_LOGIN_CHECK_USER': {
      return state
    }

    case 'SIGNED_OUT_USER': {
      return state
    }

    default: {
      return state
    }
  }
}

const modalWindows: any = (
    state: Interfaces.ModalWindowState | any = [],
    action: Interfaces.Action,
  ): any => {

  switch (action.type) {

    case 'CLOSE_MODAL_THANK_YOU':
    case 'CLOSE_ALL_MODALS': {
      return state.map((item: Interfaces.ModalWindowStateItem) => {
        return { ...item, display: false }
      })
      // console.info(`reducer->modalWindows type: ${action.type}`, { stateNext, state, action })
    }

    case 'CALL_SPINNER':
    case 'CLOSE_COMMENT_FORM':
    case 'SEND_COMMENT_FORM':
    case 'PRESS_OK_IN_SELECT_ROLE': {
      const { modalNext } = action
      let stateNext: Interfaces.ModalWindowState | any = state
      //const { length } = state
      const index: number = state.map((item: any) => item.component)
        .indexOf(modalNext)

      if (index === -1) {
        stateNext = [
          ...state,
          { component: modalNext, display: true },
        ]
      }
      else {
        stateNext = [
          ...state.slice(0, index),
          { component: modalNext, display: true },
          ...state.slice(index + 1),
        ]
      }
      // console.info(`reducer->modalWindows type: ${action.type}`, { index, stateNext, state, action })

      return stateNext
    }

    case 'OPEN_REG_BOTTOM_BODY':
    case 'OPEN_REG_TOP_BODY':
    case 'PRESS_SEARCH_BUTTON':
    case 'CLICK_USER_PROFILE':
    case 'SELECT_CATALOG_CATEGORY':
    case 'OPEN_MODAL_REGISTRATION_NAV_BAR':
    case 'OPEN_MODAL_REGISTRATION_QUICK':
    case 'OPEN_MODAL_REGISTRATION_FOOTER':
    case 'OPEN_MODAL_REGISTRATION_TO_SPEC':
    case 'OPEN_MODAL_FAREWELL': {
      const { modalNext } = action
      let stateNext: any = state
      const { length } = state
      let index: number
      if (length === 0) {
        stateNext = [
          { component: modalNext, display: true },
        ]
      }
      else {
        index = state.map((item: any) => item.component)
          .indexOf(modalNext)
        stateNext = [
          ...state.slice(0, index),
          { component: modalNext, display: true },
          ...state.slice(index + 1),
        ]
      }

      // console.info(`reducer->modalWindows type: ${action.type}`, { stateNext, state, action })
      return stateNext
    }

    case 'GO_BACK':
    case 'GO_LINK_TO_SPECIALISTS':
    case 'GO_LINK_CONTACTS':
    case 'GO_LINK_ABOUT_US':
    case 'CLOSE_MODAL_SELECT_ROLE': {
      return state
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

const treeData: any = (state: any = {}, action: Interfaces.Action): any => {

  switch (action.type) {
    case 'UPLOAD_TREE_DATA': {
      // console.info(`reducer->treeData type: ${action.type}`, { stateNext, state, action })
      return action.treeData
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
    analytics,
    language,
    user,
    modalWindows,
    actionLog,
    treeData,
  },
)

export default appCombineReducers
