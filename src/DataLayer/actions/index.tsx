import * as actionTypes from './actionTypes'

// tslint:disable-next-line: no-reserved-keywords
export const action: any = (type: string, payload: any = {}): any => {
  // console.info('action-index.js action()', { type, ...payload })
  return ({ type, ...payload })
}

// Not used now
// tslint:disable-next-line: no-reserved-keywords
export const getAction: any = (type: string): any => ({
  request: (data: any): any => action(actionTypes[type].REQUEST, data),
  success: (data: any): any => action(actionTypes[type].SUCCESS, data),
  failure: (data: any): any => action(actionTypes[type].FAILURE, data),
})

// Get asynchroneous actions for saga
// tslint:disable-next-line: no-reserved-keywords
export const getActionAsync: any = (type: string, stage: string, data: any): any => {
  // console.info('action-index.js action()', { actionTS: actionTypes[type][stage], actionT: actionTypes[type], type })
  return action(actionTypes[type][stage], data)
}

// Get synchroneours actions
// Template export const : any = (data: any): any => action(actionTypes., data)

export const UPDATE_USER_FOOTPRINT: any = (data: any): any =>  action(actionTypes.UPDATE_USER_FOOTPRINT, data)
export const DISPATCH_ACTION: any = (data: any): any => action(actionTypes.DISPATCH_ACTION, data)

/*
export const OPEN_REG_BOTTOM_BODY: any = (data: any): any =>  action(actionTypes.OPEN_REG_BOTTOM_BODY, data)
export const OPEN_REG_TOP_BODY: any = (data: any): any =>  action(actionTypes.OPEN_REG_TOP_BODY, data)
export const SELECT_LANGUAGE: any = (data: any): any =>  action(actionTypes.SELECT_LANGUAGE, data)
export const GO_BACK: any = (data: any): any =>  action(actionTypes.GO_BACK, data)
export const GO_LINK_TO_SPECIALISTS: any = (data: any): any =>  action(actionTypes.GO_LINK_TO_SPECIALISTS, data)
export const GO_LINK_CONTACTS: any = (data: any): any =>  action(actionTypes.GO_LINK_CONTACTS, data)
export const GO_LINK_ABOUT_US: any = (data: any): any =>  action(actionTypes.GO_LINK_ABOUT_US, data)
export const CALL_SPINNER: any = (data: any): any =>  action(actionTypes.CALL_SPINNER, data)
export const CLOSE_ALL_MODALS: any = (data: any): any =>  action(actionTypes.CLOSE_ALL_MODALS, data)
export const CLOSE_MODAL_THANK_YOU: any = (data: any): any =>  action(actionTypes.CLOSE_MODAL_THANK_YOU, data)
export const CLOSE_COMMENT_FORM: any = (data: any): any =>  action(actionTypes.CLOSE_COMMENT_FORM, data)
export const CLOSE_MODAL_SELECT_ROLE: any = (data: any): any => action(actionTypes.CLOSE_MODAL_SELECT_ROLE, data)
export const SEND_COMMENT_FORM: any = (data: any): any => action(actionTypes.SEND_COMMENT_FORM, data)
export const PRESS_OK_IN_SELECT_ROLE: any = (data: any): any => action(actionTypes.PRESS_OK_IN_SELECT_ROLE, data)
export const PRESS_SEARCH_BUTTON: any = (data: any): any => action(actionTypes.PRESS_SEARCH_BUTTON, data)
export const CLICK_USER_PROFILE: any = (data: any): any => action(actionTypes.CLICK_USER_PROFILE, data)
export const SELECT_CATALOG_CATEGORY: any = (data: any): any => action(actionTypes.SELECT_CATALOG_CATEGORY, data)
export const OPEN_MODAL_REGISTRATION_NAV_BAR: any = (data: any): any => action(actionTypes.OPEN_MODAL_REGISTRATION_NAV_BAR, data)
export const OPEN_MODAL_REGISTRATION_QUICK: any = (data: any): any => action(actionTypes.OPEN_MODAL_REGISTRATION_QUICK, data)
export const OPEN_MODAL_REGISTRATION_FOOTER: any = (data: any): any => action(actionTypes.OPEN_MODAL_REGISTRATION_FOOTER, data)
export const OPEN_MODAL_REGISTRATION_TO_SPEC: any = (data: any): any => action(actionTypes.OPEN_MODAL_REGISTRATION_TO_SPEC, data)
export const OPEN_MODAL_FAREWELL: any = (data: any): any => action(actionTypes.OPEN_MODAL_FAREWELL, data)
export const UPLOAD_TREE_DATA: any = (data: any): any => action(actionTypes.UPLOAD_TREE_DATA, data)
export const SELECTED_PROJECT_TO_MERGE = data => action(actionTypes.SELECTED_PROJECT_TO_MERGE, data)
export const UPDATED_NAMECOM_WIT_APPTOPTARGET = data => action(actionTypes.UPDATED_NAMECOM_WIT_APPTOPTARGET, data)
*/
