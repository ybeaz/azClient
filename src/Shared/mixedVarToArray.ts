/**
 * @description Function to convert variables into array
 */
export const mixedVarToArray: Function = (mixedVar: any): any[] => {
  let output
  if (mixedVar === undefined) {
    output = []
  } else if (typeof mixedVar === 'string') {
    output = [mixedVar]
  } else {
    output = mixedVar
  }
  return output
}
