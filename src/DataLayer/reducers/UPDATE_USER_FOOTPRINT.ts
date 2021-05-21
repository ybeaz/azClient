import { IRootStore } from '../../Interfaces/IRootStore'

export const UPDATE_USER_FOOTPRINT: Function = (
  store: IRootStore,
  data: any
): IRootStore => {
  return { ...store }
}
