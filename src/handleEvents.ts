import { store } from './DataLayer/store'
import * as action from './DataLayer/index.action'
import { ANALYTICS_PREFIX } from './Constants/analyticsPrefix'
import { cookie } from './Shared/cookie'
import { mediaSizeCrossBrowser } from './Shared/mediaSizeCrossBrowser'
import { getParsedAzClassToObj } from './Shared/getParsedAzClassToObj'
import { COOKIE_ANALYTICSID_NAME } from './Constants/cookieAnalyticsIDName'
import { EventHandler } from 'react'

interface Props {
  typeEvent: string
  type?: string
  data: any
}

export const handleEvents: Function = (event: any, props: Props): void => {
  const { type: typeStore, typeEvent, data } = props
  const type = typeStore ? typeStore : typeEvent
  const { getState, dispatch } = store
  const { hostname, pathname } = location

  const output = {
    ATTACH_EVENTS_TO_ELEMENTS: () => {
      document
        .querySelectorAll(`[class*="${ANALYTICS_PREFIX}"]`)
        .forEach((eventElem, i) => {
          const pattern = `${ANALYTICS_PREFIX}[\\s\\S]*?}`
          const re = new RegExp(pattern, 'g')
          const eventClassNamesArr = eventElem.className.match(re)

          const eventClassNamesArrMapped =
            eventClassNamesArr &&
            eventClassNamesArr.map(topicClassName =>
              getParsedAzClassToObj({
                str: topicClassName,
                prefix: ANALYTICS_PREFIX,
              })
            )

          eventClassNamesArrMapped &&
            eventClassNamesArrMapped.forEach(eventIn => {
              const { type }: any = eventIn
              type &&
                eventElem.addEventListener(type, event =>
                  handleEvents(event, {
                    typeEvent: 'SAVE_EVENT',
                    data: eventIn,
                  })
                )
            })
        })
    },

    SAVE_EVENT: () => {
      let analyticsID: string = cookie.get(COOKIE_ANALYTICSID_NAME)
      const { type, name, value: valueIn, level } = data
      console.info('handleEvents [24]', {
        analyticsID,
        event,
        name,
        value: valueIn || event?.target?.value,
        valueIn,
        'event.target.value': event?.target?.value,
        level,
        pathname,
      })

      const dataNext: any = {
        event: {
          type,
          ...(name && { name }),
          ...((valueIn || event?.target?.value) && {
            value: valueIn || event?.target?.value,
          }),
          ...(level && { level }),
          pathname,
        },
      }

      dispatch(action.SAVE_ANALYTICS.REQUEST(dataNext))
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

        const dataNext: any = {
          initData: {
            width,
            height,
            search,
            pathname,
            hostname,
            href,
            referrer,
          },
        }

        dispatch(action.SAVE_ANALYTICS.REQUEST(dataNext))
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
