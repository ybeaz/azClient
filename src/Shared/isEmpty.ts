/**
 * @description Function to check if the var is "empty" (analogy of php empty)
 */
export const isEmpty: Function = (mixedVar: any): boolean => {
  // console.info('empty', { mixedVar })
  if (!mixedVar || mixedVar === '0') {
    return true
  }

  if (typeof mixedVar === 'object') {
    for (var k in mixedVar) {
      return false
    }
    return true
  }

  if (toString.call(mixedVar) === '[object Array]' && mixedVar.length === 0) {
    return true
  } else if (
    toString.call(mixedVar) === '[object Array]' &&
    mixedVar.length > 0
  ) {
    return false
  }
  return false
}
