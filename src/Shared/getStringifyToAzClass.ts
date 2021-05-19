/**
 * @description Function to stringify object to the pattern "az_{'a':1,'b':'some value'}"
 * @param obj
 * @returns
 */
export const getStringifyToAzClass: Function = (obj: any): string => {
  const az0 = JSON.stringify(obj)
  const az1 = az0.replace(/\"/g, "'")
  return `az_${az1}`
}
