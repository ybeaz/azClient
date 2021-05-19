import { v4 as uuidv4 } from 'uuid'

import * as action from './DataLayer/index.action'
import { store } from './DataLayer/store'
import * as serviceFunc from './Shared/serviceFunc'
import * as Interfaces from './Shared/interfaces'

/**
 * @description Block for defining endpoint (dev, prod mode)
 */
const { href, hostname, pathname, search } = location
const endpoint: string = serviceFunc.getEndpoint(location)

/**
 * @description Block for starting a session and collecting an initial data
 */
let utAnltSid: string = serviceFunc.Cookie.get('utAnltSid')
if (utAnltSid === undefined) {
  utAnltSid = uuidv4()
  serviceFunc.Cookie.set('utAnltSid', utAnltSid, {
    domain: hostname,
    days: 0.5,
  })
}
const { width, height } = serviceFunc.mediaSizeCrossBrowser(global)
const { referrer } = document
const target: any[] = [{ level: 0, name: 'start' }] // [JSON.stringify({ level: 0, name: 'start' })]
const initData: any[] = [
  { width, height, search, pathname, hostname, href, referrer },
]
const data: any = { endpoint, utAnltSid, target, initData }
store.dispatch(action.UPDATE_USER_FOOTPRINT(data))
setTimeout(() => {
  const data: any = {
    endpoint,
    operationName: 'SaveAnalytics',
    variables: {
      webAnalytics: {
        hash256: '',
        initData,
      },
    },
    query:
      'mutation SaveAnalytics($analyticsInput: AnalyticsInput!){saveAnalytics(analyticsInput: $analyticsInput){ analyticsID, hash256, dateCreate, dateUpdate, initData { ...InitDataAll } }} fragment InitDataAll on InitData { width, height, search, pathname, hostname, href, referrer }',
  }

  console.info('index [46]', {
    action: action.SAVE_ANALYTICS.REQUEST(data),
  })
  store.dispatch(action.SAVE_ANALYTICS.REQUEST(data))
  // const storeSlip: object = store.getState()
  // console.info('index->start session [0] ', { payload, storeSlip, data })
}, 50)

/**
 * @description Block for watching topics that the user takes a look at
 */
let eventTarget: any
window.onmouseover = (e: Event): void => {
  eventTarget = e.target
}
setInterval(() => {
  // if (eventTarget !== undefined
  //   && eventTarget.closest('[class*="utAzTopic_"]') !== undefined
  //   && eventTarget.closest('[class*="utAzTopic_"]') !== null
  // ) {
  //   const topicClassNames: string = eventTarget.closest('[class*="utAzTopic_"]').className
  //   const topic: string = topicClassNames.replace(/^([\s\S]*?)(utAzTopic_[\S]*?)($|\s[\s\S]*?)$/gim, '$2')
  //     .replace(/^(utAzTopic_)([\S]*?)$/gim, '$2')
  //   // serviceFunc.saveUserVisitActions({ target: 'looking', topic })
  //   // console.info('index.js', { topic })
  //   const { topics: record } = store.getState().userFootprint
  //   const topics: string[] = [topic]
  //   const topicsNext: string[] = serviceFunc.getArrToSave(record, topics, 'add', '', '')
  //   store.dispatch(actions.UPDATE_USER_FOOTPRINT({ topics: topicsNext }))
  //   /*
  //   setTimeout(() => {
  //     //const { topics: recordNext } = store.getState().userFootprint
  //     //console.info('index.js Topics', { userFootprint: store.getState(), topicsNext, dataInp, record })
  //   }, 250)
  //   */
  // }
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
  //   eventDataNext = serviceFunc.filterArrObjFirst(eventDataNext, 'eventClass')
  //   // console.info('index.js [3]', { eventDataNext, eventDataPrev })
  //   eventDataNext = serviceFunc.getArrToSave(eventDataPrev, eventDataNext, 'add', '', 'eventClass')
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
