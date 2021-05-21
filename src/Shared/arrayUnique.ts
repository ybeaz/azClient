/**
 * @description Function to filter data to array with unique values
 */
export const arrayUnique: Function = (data: any[]): any[] => {
  const x: any[] = data.slice().sort()
  const temp: any[] = []
  let index: number = 0
  for (let i: number = 0; i < x.length; i += 1) {
    if (
      x[i] !== undefined &&
      JSON.stringify(x[i]) !== JSON.stringify(x[i + 1])
    ) {
      temp[index] = x[i]
      index += 1
    }
  }

  return temp
}
