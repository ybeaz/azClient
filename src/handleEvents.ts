import { store } from './DataLayer/store'
import * as action from './DataLayer/index.action'
import { ANALYTICS_PREFIX } from './Constants/analyticsPrefix'
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
      if (
        eventTarget &&
        eventTarget.closest(`[class*="${ANALYTICS_PREFIX}"]`)
      ) {
        const topicClassNames: string = eventTarget.closest(
          `[class*="${ANALYTICS_PREFIX}"]`
        ).className
        const pattern = `${ANALYTICS_PREFIX}[\\s\\S]*?}`
        const re = new RegExp(pattern, 'g')
        const topicClassNamesArr = topicClassNames.match(re)

        const topicClassNamesArrMapped =
          topicClassNamesArr &&
          topicClassNamesArr.map(topicClassName =>
            getParsedAzClassToObj({
              str: topicClassName,
              prefix: ANALYTICS_PREFIX,
            })
          )

        topicClassNamesArrMapped &&
          topicClassNamesArrMapped.forEach(topicIn => {
            const { spec, ...topic }: any = topicIn

            spec === 'topic' &&
              dispatch(
                action.SAVE_ANALYTICS.REQUEST({
                  spec,
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
        const data: any = { spec: 'initData', initData }

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
