import uuidv4 from 'uuid/v4'

import * as actions from './DataLayer/actions/index'
import store from './DataLayer/store'
import * as Interfaces from './Shared/interfaces'
import * as serviceFunc from './Shared/serviceFunc'

/**
 * @description Block for defining endpoint (dev, prod mode)
 */
  const { href, hostname, pathname, search } = location
  const endpoint = serviceFunc.getEndpoint(location)
  // console.info('index.js [1]', { endpoint, location })

/**
 * @description Block for starting a session and collecting an initial data
 */
const optGet: string = 'sus'
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
const target: {}[] = [{ level: 0, name: 'start' }] // [JSON.stringify({ level: 0, name: 'start' })]
const initData: {}[] = [{ width, height, search, pathname, hostname, href, referrer }]
const data: {} = { endpoint, optGet, utAnltSid, target, initData }
store.dispatch(actions.UPDATE_USER_FOOTPRINT(data))
setTimeout(
  () => {
    const payload: object = data
    store.dispatch(actions.getActionAsync('START_USER_SESSION', 'REQUEST', payload))
    const storeSlip: object = store.getState()
    // console.info('index->start session [0] ', { payload, storeSlip, data })
  },
  50,
)

/**
 * @description Block for watching topics that the user takes a look at
 */
let eventTarget: any
window.onmouseover = (e: Event): void => {
  eventTarget = e.target
}
setInterval(() => {
  if (eventTarget !== undefined
    && eventTarget.closest('[class*="utAzTopic_"]') !== undefined
    && eventTarget.closest('[class*="utAzTopic_"]') !== null
  ) {
    const topicClassNames: string = eventTarget.closest('[class*="utAzTopic_"]').className
    const topic: string = topicClassNames.replace(/^([\s\S]*?)(utAzTopic_[\S]*?)($|\s[\s\S]*?)$/gim, '$2')
      .replace(/^(utAzTopic_)([\S]*?)$/gim, '$2')
    // serviceFunc.saveUserVisitActions({ target: 'looking', topic })
    // console.info('index.js', { topic })

    const { topics: record } = store.getState().userFootprint
    const topics: string[] = [topic]
    const topicsNext: string[] = serviceFunc.getArrToSave(record, topics, 'add', '')
    store.dispatch(actions.UPDATE_USER_FOOTPRINT({ topics: topicsNext }))

    /*
    setTimeout(() => {
      //const { topics: recordNext } = store.getState().userFootprint
      //console.info('index.js Topics', { userFootprint: store.getState(), topicsNext, dataInp, record })
    }, 250)
    */
  }
}, 1000)

/**
 * @description Block for attaching watch function on possible user actions
 */
setTimeout(() => {

  const watchActionCallBack: Function = (props: any): void => {
    const { event, eventType, eventName, eventLevelNext, actionElem } = props
    const { localName, type } = actionElem
    const { actions: record, target: azTarget } = store.getState().userFootprint

    // Block for actions
    let actionsNext: {}[] = [{ type: eventType, name: eventName }] // [dataInpStr]
    actionsNext = serviceFunc.getArrToSave(record, actionsNext, 'add', '')

    /* *******************************************************
    // TO DO: IMPLEMENT SOMETHING LIKE 'Block for actions'
    ******************************************************** */
    // Block for inpData
    let val: string | number = event.target.value
    if (localName === 'input' && type === 'checkbox') {
      val = event.target.checked
    }
    const inpData = [{ tag: localName, val }]
    // console.info('index.js Actions [5]', { val, localName, type, eventType, azTarget, target: event.target, actionElem })

    // Block for target
    const { level } = azTarget[0] // JSON.parse(target[0])
    const eventLevel: number = level ? level : 0
    // console.info('index.js Actions [5]', { eventLevelNext, eventLevel, level, parse: JSON.parse(target[0] })
    if (eventLevelNext > eventLevel) {
      const targetNextObj: object = {
        level: eventLevelNext,
        name: eventName,
      }
      const targetNext: {}[] = [targetNextObj] // [JSON.stringify(targetNextObj)]
      store.dispatch(actions.UPDATE_USER_FOOTPRINT({ target: targetNext }))
    }

    store.dispatch(actions.UPDATE_USER_FOOTPRINT({ actions: actionsNext, inpData }))

    /**/
    setTimeout(() => {
      const { actions: recordNext } = store.getState().userFootprint
      console.info('index.js Actions [10]', { userFootprint: store.getState(), actionsNext, record })
    }, 250)
    
  }

  // For actions collecting
  const actionElems: any = document.querySelectorAll('[class*="utAzAction_"]')
  const actionArr: any[] = []
  for (let i = 0; i < actionElems.length; i += 1) {
    const eventTypeClass: string = actionElems[i].className
      .replace(/^([\s\S]*?)(utAzAction_[\S]*?)($|\s[\s\S]*?)$/gim, '$2')
    const eventTypeArr: string[] = eventTypeClass.replace(/^(utAzAction_)([\S]*?)$/gim, '$2')
      .split('_')

    const [eventType, eventName, eventLevel] = eventTypeArr
    actionArr.push({ eventTypeClass, eventType, eventName, eventLevel })
    const eventLevelNext: number = eventLevel ? parseInt(eventLevel, 10) : 0
    actionElems[i].addEventListener(eventType, (event: Event) => {
      const props: any = { event, eventType, eventName, eventLevelNext, actionElem: actionElems[i] }

      return watchActionCallBack(props)
    })
  }

  // console.info('index.js Actions [0]', { actionArr })
}, 500)

/**
 * @description Block for writing data into database
*/
// setInterval(() => {
setTimeout(() => {
    const reduxStore: Interfaces.Store = store.getState()
    const utAnltSidTemp: string = reduxStore.userFootprint.utAnltSid
    const topicsTemp: {}[] = reduxStore.userFootprint.topics
    const actionsTemp: {}[] = reduxStore.userFootprint.actions
    const targetTemp: {} = reduxStore.userFootprint.target
    const optPost: string = 'sua'
    const payload: {} = { endpoint, optPost, utAnltSid: utAnltSidTemp, topics: topicsTemp, actions: actionsTemp, target: targetTemp }

    store.dispatch(actions.getActionAsync('SAVE_USER_VISIT_ACTIONS', 'REQUEST', payload))
    // console.info('index.js->save fooprint [10]', { payload })
  },
  5000,
)

/*
  const storeSlip: any = store.getState()
  const { userFootprint } = storeSlip
  const { topics, actions, target } = userFootprint

*/
