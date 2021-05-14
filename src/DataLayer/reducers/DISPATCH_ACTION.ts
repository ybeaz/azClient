import { IRootStore } from '../../Interfaces/IRootStore'

export const DISPATCH_ACTION: Function = (
  store: IRootStore,
  data: any
): IRootStore => {
  const { log } = store
  const logNext = [...log, data]
  return { ...store, log: logNext }
}
