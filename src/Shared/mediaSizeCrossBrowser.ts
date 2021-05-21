/**
 * @description Function to return width of the DOM object's in crossbrowser style
 */
export const mediaSizeCrossBrowser: Function = (w: Window) => {
  const mediaSize: { width: number; height: number } = { width: 0, height: 0 }
  const d: Document = w.document
  const e: HTMLElement = d.documentElement
  const g: HTMLBodyElement = d.getElementsByTagName('body')[0]
  const x: number = w.innerWidth || e.clientWidth || g.clientWidth
  const y: number = w.innerHeight || e.clientHeight || g.clientHeight
  // console.info(' mediaSize:', { x, y })

  mediaSize.width = x
  mediaSize.height = y

  //console.info(' mediaSize:', { mediaSize })
  return mediaSize
}
