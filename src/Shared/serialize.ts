/**
 * @description Function to serialize object or array for get request
 */
export const serialize: Function = (obj: any, prefix: string): string => {
  const arr: any[] = []
  Object.keys(obj).forEach((key: string) => {
    const k: string = prefix ? `${prefix}[${key}]` : key
    const v: any = obj[key]
    arr.push(
      v !== null && typeof v === 'object'
        ? serialize(v, k)
        : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
    )
  })

  return arr.join('&')
}
