export interface IInitData {
  width: number
  height: number
  search: string
  pathname: string
  hostname: string
  href: string
  referrer: string
}

export interface ITopic {
  name: string
  pathname: string
}

export interface IEvent {
  type: string
  name: string
  value: string
  pathname: string
}

export interface ITarget {
  level: number
  name: string
  pathname: string
}

export interface IAnalyticsInput {
  analyticsID?: string
  hash256?: string
  type?: string
  initData?: IInitData
  topic?: ITopic
  event?: IEvent
  target?: ITarget
}
