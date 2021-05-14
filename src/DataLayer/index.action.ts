import { createRequestTypes, ICreateRequestTypes } from './createRequestTypes'
import { IAction } from '../Interfaces/IAction'

// Asynchroneous actions for saga
export const GET_USER_ANALYTICS_DATA: ICreateRequestTypes = createRequestTypes(
  'GET_USER_ANALYTICS_DATA'
)
export const SAVE_USER_VISIT_ACTIONS: ICreateRequestTypes = createRequestTypes(
  'SAVE_USER_VISIT_ACTIONS'
)
export const CANCEL_USER_REGISTRATION: ICreateRequestTypes = createRequestTypes(
  'CANCEL_USER_REGISTRATION'
)
export const START_USER_SESSION: ICreateRequestTypes =
  createRequestTypes('START_USER_SESSION')

// Get synchroneours actions
export const UPDATE_USER_FOOTPRINT: Function = (data: any): IAction => ({
  type: 'UPDATE_USER_FOOTPRINT',
  data,
})

export const DISPATCH_ACTION: Function = (data: any): IAction => ({
  type: 'DISPATCH_ACTION',
  data,
})
