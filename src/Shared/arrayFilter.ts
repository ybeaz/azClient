/**
 * @description Function to filter array (analogy of php array_filter)
 */
export const arrayFilter: Function = (data: any): any => {
  return data.filter((item: any) => JSON.stringify(item) !== JSON.stringify([]))
}
