import { nanoid } from 'nanoid'

import { getArrToSave } from './Shared/getArrToSave'
import { filterArrObjFirst } from './Shared/filterArrObjFirst'
import { handleEvents } from './handleEvents'
import * as action from './DataLayer/index.action'
import { store } from './DataLayer/store'

/**
 * @description Block for starting a session and collecting an initial data
 */
setTimeout(() => {
  handleEvents({}, { typeEvent: 'SAVE_INIT_DATA' })
}, 50)

/**
 * @description Block for watching topics that the user takes a look at
 */
let eventTarget: any
window.onmouseover = (e: Event): void => {
  eventTarget = e.target
}
setInterval(() => {
  handleEvents({}, { typeEvent: 'SAVE_TOPIC', data: { eventTarget } })
}, 1000)

/**
 * @description Block for attaching watch function on possible user actions and other events
 */
setTimeout(() => {
  // const watchActionCallBack: Function = (props: any): void => {
  //   const { event, eventType, eventName, eventLevelNext, eventClass, actionElem } = props
  //   const { localName, type } = actionElem
  //   const { eventData: eventDataPrev, target: targetPrev } = store.getState().userFootprint
  //   // Block for eventData (and actions)
  //   let val: string | number = event.target.value
  //   if (localName === 'input' && type === 'checkbox') {
  //     val = event.target.checked
  //   }
  //   let eventDataNext: any[] = [{ eventClass, tag: localName, val }]
  //   eventDataNext = filterArrObjFirst(eventDataNext, 'eventClass')
  //   // console.info('index.js [3]', { eventDataNext, eventDataPrev })
  //   eventDataNext = getArrToSave(eventDataPrev, eventDataNext, 'add', '', 'eventClass')
  //   // console.info('index.js [4]', { eventDataNext, eventDataPrev })
  //   // Block for target
  //   const { level } = targetPrev[0] // JSON.parse(target[0])
  //   const eventLevel: number = level ? parseInt(level, 10) : 0
  //   // console.info('index.js [5]', { eventLevelNext, eventLevel, level, parse: JSON.parse(target[0] })
  //   if (eventLevelNext > eventLevel) {
  //     const targetNextObj: object = {
  //       level: eventLevelNext,
  //       name: eventName,
  //     }
  //     const targetNext: any[] = [targetNextObj] // [JSON.stringify(targetNextObj)]
  //     store.dispatch(actions.UPDATE_USER_FOOTPRINT({ target: targetNext }))
  //   }
  //   // console.info('index.tsx [07]', { eventLevelNext, eventDataNext })
  //   store.dispatch(actions.UPDATE_USER_FOOTPRINT({ eventData: eventDataNext }))
  //   /*
  //   setTimeout(() => {
  //     console.info('index.js [10]', { userFootprint: store.getState(), eventDataNext, actionsNext })
  //   }, 250)
  //   */
  // }
  // // For event-actions collecting
  // const actionElems: any = document.querySelectorAll('[class*="utAzAction_"]')
  // const actionArr: any[] = []
  // for (let i = 0; i < actionElems.length; i += 1) {
  //   const eventClass: string = actionElems[i].className
  //     .replace(/^([\s\S]*?)(utAzAction_[\S]*?)($|\s[\s\S]*?)$/gim, '$2')
  //   const eventTypeArr: string[] = eventClass.replace(/^(utAzAction_)([\S]*?)$/gim, '$2')
  //     .split('_')
  //   const [eventType, eventName, eventLevel] = eventTypeArr
  //   actionArr.push({ eventClass, eventType, eventName, eventLevel })
  //   const eventLevelNext: number = eventLevel ? parseInt(eventLevel, 10) : 0
  //   actionElems[i].addEventListener(eventType, (event: Event) => {
  //     const props: any = {
  //       event, eventType, eventName, eventLevelNext,
  //       eventClass, actionElem: actionElems[i],
  //   }
  //     return watchActionCallBack(props)
  //   })
  // }
  // console.info('index.js [0]', { actionArr })
}, 500)

/**
 * @description Block for writing data into database
 */
setInterval(() => {
  // setTimeout(() => {
  // const reduxStore: Interfaces.Store = store.getState()
  // const {
  //   utAnltSid: utAnltSidTemp,
  //   topics: topicsTemp,
  //   eventData: eventDataTemp,
  //   target: targetTemp,
  // } = reduxStore.userFootprint
  // const eventDataTemp2: { type: String; name: String; level: Number; val: String }[] = []
  // if (eventDataTemp.length > 0) {
  //   for (const item of eventDataTemp) {
  //     const { type, name, level, val } = item
  //     eventDataTemp2.push({ type, name, level, val })
  //   }
  // }
  // // console.info('index.tsx [09]', { eventDataTemp, eventDataTemp2 })
  // const payload: {} = {
  //   endpoint,
  //   operationName: false,
  //   variables: {
  //     webAnalytics: {
  //       utAnltSid: utAnltSidTemp,
  //       topics: topicsTemp,
  //       eventData: eventDataTemp2,
  //       target: targetTemp,
  //     },
  //   },
  //   query: 'mutation saveUserAnalytics3($webAnalytics: WebAnalyticsInput){saveUserAnalytics3(webAnalytics: $webAnalytics){n, nModified, ok, upserted}}',
  // }
  // store.dispatch(actions.getActionAsync('SAVE_ANALYTICS', 'REQUEST', payload))
  // // console.info('index.js->save fooprint [10]', { eventDataTemp, payload })
}, 2000)
