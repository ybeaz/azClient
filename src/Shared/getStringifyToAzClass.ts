/**
 * @description Function to stringify object to the pattern "az_{'a':1,'b':'some value'}"
 * @param obj: any
 * @returns string
 * @example "az_{'a':1,'b':'some value'}"
 */
export const getStringifyToAzClass: Function = (
  obj: any,
  prefix: string = 'az_'
): string => {
  const az0 = JSON.stringify(obj)
  const az1 = az0.replace(/\"/g, "'")
  return `${prefix}${az1}`
}
