import { IRootStore } from '../../Interfaces/IRootStore'

export const SAVE_ANALYTICS_SUCCESS: Function = (
  store: IRootStore,
  data: any
): IRootStore => {
  const { analyticsID } = data
  return { ...store, analyticsID }
}
