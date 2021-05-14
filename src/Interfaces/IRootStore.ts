export interface IRootStore {
  log: {
    readonly utAnltSid?: string
    readonly initData?: any[] | []
    readonly eventData?: any[] | []
    readonly topics?: string[] | []
    readonly target?: any[] | []
  }[]
}
