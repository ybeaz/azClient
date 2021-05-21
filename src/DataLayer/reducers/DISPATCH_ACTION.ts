import { IRootStore } from '../../Interfaces/IRootStore'

export const DISPATCH_ACTION: Function = (
  store: IRootStore,
  data: any
): IRootStore => {
  return { ...store }
}
