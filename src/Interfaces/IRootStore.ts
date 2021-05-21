export interface IRootStore {
  readonly analyticsID?: string
  readonly initData?: any[] | []
  readonly eventData?: any[] | []
  readonly topics?: string[] | []
  readonly target?: any[] | []
}
