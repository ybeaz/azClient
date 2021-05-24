/**
 * @description Function to return obj reduced to arr fields
 * @borrows both server and client
 */
export const arrReduceObjPropsConsistent: Function = (
  obj: any,
  arr: any[]
): any => {
  if (!obj) {
    return {}
  }

  let objNext = {}
  let consistency = true
  arr.forEach(item => {
    if (consistency && obj[item] !== undefined) {
      objNext[item] = obj[item]
    } else {
      consistency = false
      objNext = {}
    }
  })
  return objNext
}
