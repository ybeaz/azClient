/**
 * @description Function to convert back to object string of pattern "az_{'a':1,'b':'some value'}"
 * @param str
 * @returns
 */
export const getParsedAzClassToObj: Function = (str: string): any => {
  const az0 = str.match(/^az_([\s\S^_]*?)$/)
  try {
    const az1 = az0[1]
    const az2 = az1.replace(/\'/g, '"')
    return JSON.parse(az2)
  } catch (error) {
    return undefined
  }
}
