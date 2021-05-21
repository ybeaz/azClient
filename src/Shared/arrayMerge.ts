import { mixedVarToArray } from './mixedVarToArray'

/**
 * @description Function to merge two mixed variables into std. arrays, (analogy of php array_merge)
 */
export const arrayMerge: Function = (dataNext, data): any => {
  const dataNext1 = mixedVarToArray(dataNext)
  const data1 = mixedVarToArray(data)
  // console.info('array_merge', { dataNext1, data1, dataNext, data })
  return [...data1, ...dataNext1]
}
