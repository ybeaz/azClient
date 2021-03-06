import { handleEvents } from './handleEvents'

/**
 * @description Block for starting a session and collecting an initial data
 */
setTimeout(() => {
  handleEvents({}, { typeEvent: 'SAVE_INIT_DATA' })
}, 500)

window.addEventListener('load', function () {
  /**
   * @description Block for attaching watch function on possible user actions and other events
   */
  setTimeout(() => {
    handleEvents({}, { typeEvent: 'ATTACH_EVENTS_TO_ELEMENTS' })
  }, 1000)
})
