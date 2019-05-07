
import * as actions from './DataLayer/actions/index'
import store from './DataLayer/store'
import * as serviceFunc from './Shared/serviceFunc'


/**
 * @description Block for starting a session and collecting an initial "footprint"
 */
const { href, hostname, pathname, search } = location
const utAnltSid = serviceFunc.Cookie.get('utAnltSid')

const { width, height } = serviceFunc.mediaSizeCrossBrowser(global)
const target: string = JSON.stringify(['startSession'])
const { referrer } = document
const payload: object = { optGet: 'sus', utAnltSid, target, width, height, search, pathname, hostname, href, referrer }
// store.dispatch(actions.getActionAsync('START_USER_SESSION', 'REQUEST', payload))
console.info('index->app [10] ', { payload })


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
  }
}, 2000)


/**
 * @description Block for attaching watch function on possible user actions
 */
setTimeout(() => {

  const watchActionCallBack: Function = (event: Event, eventType: string, eventName: string) => {
    console.info('watchActionCallBack', { eventType, eventName, date: Date(), event })
  }

  const actionElems: any = document.querySelectorAll('[class*="utAzAction_"]')

  const actionArr: any[] = []
  for (let i = 0; i < actionElems.length; i += 1) {
    const eventTypeClass: string = actionElems[i].className
      .replace(/^([\s\S]*?)(utAzAction_[\S]*?)($|\s[\s\S]*?)$/gim, '$2')
    const eventTypeArr: string[] = eventTypeClass.replace(/^(utAzAction_)([\S]*?)$/gim, '$2')
      .split('_')

    const [eventType, eventName] = eventTypeArr
    actionElems[i].addEventListener(eventType, (event: Event) => {watchActionCallBack(event, eventType, eventName)})
  }
}, 500)
