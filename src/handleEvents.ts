import { store } from './DataLayer/store'
import * as action from './DataLayer/index.action'

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
    // TOGGLE_MEDIA_LOADED: () => {
    //   const { mediaKey, isMediaLoaded } = data
    //   dispatch(action.TOGGLE_MEDIA_LOADED({ mediaKey, isMediaLoaded }))
    // },
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
