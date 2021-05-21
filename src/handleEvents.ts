import { store } from './DataLayer/store'
import * as action from './DataLayer/index.action'
import { mediaSizeCrossBrowser } from './Shared/mediaSizeCrossBrowser'
import { getParsedAzClassToObj } from './Shared/getParsedAzClassToObj'

interface Props {
  typeEvent: string
  type?: string
  data: any
}

export const handleEvents: Function = (event: Event, props: Props): void => {
  const { type: typeStore, typeEvent, data } = props
  const type = typeStore ? typeStore : typeEvent
  const { dispatch } = store

  const output = {
    SAVE_TARGET: () => {},
    SAVE_ACTION: () => {},
    SAVE_TOPIC: () => {
      const { eventTarget } = data
      if (eventTarget && eventTarget.closest('[class*="az_"]')) {
        const topicClassNames: string =
          eventTarget.closest('[class*="az_"]').className
        const tipicClassNamesArr = topicClassNames
          .match(/az_[\s\S]*?}/g)
          .map(topicClassName => getParsedAzClassToObj(topicClassName))

        tipicClassNamesArr.forEach(topic => {
          const data: any = { topic }
          dispatch(action.SAVE_ANALYTICS.REQUEST(data))
        })
      }
    },
    SAVE_INIT_DATA: () => {
      const { href, hostname, pathname, search } = location
      const { width, height } = mediaSizeCrossBrowser(global)
      const { referrer } = document

      const initData: any = {
        width,
        height,
        search,
        pathname,
        hostname,
        href,
        referrer,
      }
      const data: any = { initData }

      dispatch(action.SAVE_ANALYTICS.REQUEST(data))
    },
  }

  output[type]
    ? output[type]()
    : console.info('handleEvents [error]', 'strange type', {
        typeStore,
        typeEvent,
        type,
        data,
      })
}
