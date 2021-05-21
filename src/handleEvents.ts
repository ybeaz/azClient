import { store } from './DataLayer/store'
import * as action from './DataLayer/index.action'
import { cookie } from './Shared/cookie'
import { mediaSizeCrossBrowser } from './Shared/mediaSizeCrossBrowser'
import { getParsedAzClassToObj } from './Shared/getParsedAzClassToObj'
import { COOKIE_ANALYTICSID_NAME } from './Constants/cookieAnalyticsIDName'

interface Props {
  typeEvent: string
  type?: string
  data: any
}

export const handleEvents: Function = (event: Event, props: Props): void => {
  const { type: typeStore, typeEvent, data } = props
  const type = typeStore ? typeStore : typeEvent
  const { getState, dispatch } = store
  const { hostname, pathname } = location

  const output = {
    SAVE_TARGET: () => {},

    SAVE_ACTION: () => {},

    SAVE_TOPIC: () => {
      const { eventTarget } = data
      if (eventTarget && eventTarget.closest('[class*="az_"]')) {
        const topicClassNames: string =
          eventTarget.closest('[class*="az_"]').className
        const topicClassNamesArr = topicClassNames.match(/az_[\s\S]*?}/g)

        const topicClassNamesArrMapped = topicClassNamesArr.map(
          topicClassName =>
            getParsedAzClassToObj({ str: topicClassName, prefic: 'az_' })
        )

        console.info('handleEvents [36]', {
          data,
          topicClassNamesArr,
          topicClassNamesArrMapped,
        })

        topicClassNamesArrMapped.forEach(topicIn => {
          const { type, ...topic }: any = topicIn

          console.info('handleEvents [44]', { data })

          dispatch(
            action.SAVE_ANALYTICS.REQUEST({
              type,
              topic: { ...topic, pathname },
            })
          )
        })
      }
    },

    SAVE_INIT_DATA: () => {
      let analyticsID: string = cookie.get(COOKIE_ANALYTICSID_NAME)
      if (analyticsID && analyticsID !== 'null') {
        dispatch(action.SAVE_ANALYTICS.SUCCESS({ analyticsID }))
        cookie.set(COOKIE_ANALYTICSID_NAME, analyticsID, {
          domain: hostname,
          days: 0.5,
        })
      } else {
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
        const data: any = { type: 'initData', initData }

        dispatch(action.SAVE_ANALYTICS.REQUEST(data))
      }
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
