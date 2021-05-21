interface IGetParsedAzClassToObj {
  str: string
  prefix: string
}

/**
 * @description Function to convert back to object string of pattern "az_{'a':1,'b':'some value'}"
 * @param str: string
 * @returns obj: any
 * @example "az_{'a':1,'b':'some value'}"
 */
export const getParsedAzClassToObj: Function = ({
  str,
  prefix = 'az_',
}: IGetParsedAzClassToObj): any => {
  const pattern = `^${prefix}([\\s\\S^_]*?)$`
  const re = new RegExp(pattern)
  const az0 = str.match(re)
  try {
    const az1 = az0[1]
    const az2 = az1.replace(/\'/g, '"')
    return JSON.parse(az2)
  } catch (error) {
    return undefined
  }
}
