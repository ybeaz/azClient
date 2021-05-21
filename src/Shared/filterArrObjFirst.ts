/**
 * @description Function to filter the first object of the object group with prop in an array of objects
 */
export const filterArrObjFirst: Function = (
  arrObj: any[],
  prop: string
): any => {
  const arrObjNext: any[] = []

  arrObj.forEach((obj: any) => {
    const propName: string = obj[prop]
    if (arrObjNext.every((item: any) => !item[propName])) {
      const eventTypeArr: string[] = obj[prop]
        .replace(/^(utAzAction_)([\S]*?)$/gim, '$2')
        .split('_')
      const [eventType, eventName, eventLevel] = eventTypeArr
      const eventLevelNext: number =
        eventLevel !== undefined ? parseInt(eventLevel, 10) : 0
      arrObjNext.push({
        ...obj,
        type: eventType,
        name: eventName,
        level: eventLevelNext,
        [propName]: true,
      })
    }
  })

  return arrObjNext
}
