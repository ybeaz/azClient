export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

export const createRequestTypes = base =>
  [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})

// Asynchroneous actions for saga
export const GET_USER_ANALYTICS_DATA: any = createRequestTypes('GET_USER_ANALYTICS_DATA')
export const SAVE_USER_VISIT_ACTIONS: any = createRequestTypes('SAVE_USER_VISIT_ACTIONS')
export const CANCEL_USER_REGISTRATION: any = createRequestTypes('CANCEL_USER_REGISTRATION')
export const START_USER_SESSION: any = createRequestTypes('START_USER_SESSION')
// export const LOADED_DOC_NAMED = createRequestTypes('LOADED_DOC_NAMED')

// Synchroneours actions
// Template export const  = ''
export const UPDATE_USER_FOOTPRINT: string = 'UPDATE_USER_FOOTPRINT'

export const OPEN_REG_BOTTOM_BODY: string = 'OPEN_REG_BOTTOM_BODY'
export const OPEN_REG_TOP_BODY: string = 'OPEN_REG_TOP_BODY'
export const SELECT_LANGUAGE: string = 'SELECT_LANGUAGE'
export const GO_BACK: string = 'GO_BACK'
export const GO_LINK_TO_SPECIALISTS: string = 'GO_LINK_TO_SPECIALISTS'
export const GO_LINK_CONTACTS: string = 'GO_LINK_CONTACTS'
export const GO_LINK_ABOUT_US: string = 'GO_LINK_ABOUT_US'
export const CALL_SPINNER: string = 'CALL_SPINNER'
export const CLOSE_ALL_MODALS: string = 'CLOSE_ALL_MODALS'
export const CLOSE_MODAL_THANK_YOU: string = 'CLOSE_MODAL_THANK_YOU'
export const CLOSE_COMMENT_FORM: string = 'CLOSE_COMMENT_FORM'
export const CLOSE_MODAL_SELECT_ROLE: string = 'CLOSE_MODAL_SELECT_ROLE'
export const SEND_COMMENT_FORM: string = 'SEND_COMMENT_FORM'
export const PRESS_OK_IN_SELECT_ROLE: string = 'PRESS_OK_IN_SELECT_ROLE'
export const PRESS_SEARCH_BUTTON: string = 'PRESS_SEARCH_BUTTON'
export const CLICK_USER_PROFILE: string = 'CLICK_USER_PROFILE'
export const SELECT_CATALOG_CATEGORY: string = 'SELECT_CATALOG_CATEGORY'
export const OPEN_MODAL_REGISTRATION_NAV_BAR: string = 'OPEN_MODAL_REGISTRATION_NAV_BAR'
export const OPEN_MODAL_REGISTRATION_QUICK: string = 'OPEN_MODAL_REGISTRATION_QUICK'
export const OPEN_MODAL_REGISTRATION_FOOTER: string = 'OPEN_MODAL_REGISTRATION_FOOTER'
export const OPEN_MODAL_REGISTRATION_TO_SPEC: string = 'OPEN_MODAL_REGISTRATION_TO_SPEC'
export const OPEN_MODAL_FAREWELL: string = 'OPEN_MODAL_FAREWELL'
export const DISPATCH_ACTION: string = 'DISPATCH_ACTION'
export const UPLOAD_TREE_DATA: string = 'UPLOAD_TREE_DATA'
// export const SELECTED_PROJECT_TO_MERGE = 'SELECTED_PROJECT_TO_MERGE'
// export const UPDATED_NAMECOM_WIT_APPTOPTARGET = 'UPDATED_NAMECOM_WIT_APPTOPTARGET'
