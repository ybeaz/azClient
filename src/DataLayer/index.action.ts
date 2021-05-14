import { createRequestTypes } from './createRequestTypes'

// Asynchroneous actions for saga
export const GET_USER_ANALYTICS_DATA: any = createRequestTypes(
  'GET_USER_ANALYTICS_DATA'
)
export const SAVE_USER_VISIT_ACTIONS: any = createRequestTypes(
  'SAVE_USER_VISIT_ACTIONS'
)
export const CANCEL_USER_REGISTRATION: any = createRequestTypes(
  'CANCEL_USER_REGISTRATION'
)
export const START_USER_SESSION: any = createRequestTypes('START_USER_SESSION')

// Get synchroneours actions
export const UPDATE_USER_FOOTPRINT: any = (data: any): any => ({
  type: 'UPDATE_USER_FOOTPRINT',
  data,
})

export const DISPATCH_ACTION: any = (data: any): any => ({
  type: 'DISPATCH_ACTION',
  data,
})
