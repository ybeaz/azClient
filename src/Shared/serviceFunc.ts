
/**
 * @description Function to return width of the DOM object's in crossbrowser style
 */
export const mediaSizeCrossBrowser: Function = (w: Window) => {
  // Use serviceFunc.mediaSizeCrossBrowser(global)
  const mediaSize: {width: number; height: number} = {width: 0, height: 0}
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

/**
 * @description Cookie: get, set, delete
 * @link https://stackoverflow.com/a/48706852/4791116
 * @link http://usejsdoc.org/
 */
export const Cookie =
    { get: (name: string) => {
        let c = document.cookie.match(`(?:(?:^|.*; *)${name} *= *([^;]*).*$)|^.*$`)[1]
        if (c) return decodeURIComponent(c)
      }
    , set: (name: string, value: string, opts: any = {}) => { 
        if (opts.days) { 
            opts['max-age'] = opts.days * 60 * 60 * 24; 
            delete opts.days 
            }
        const { hostname } = location
        if ( hostname === '127.0.0.1') {
          delete opts.domain
        }
        const optsStr = Object.entries(opts).reduce((str, [k, v]) => `${str}; ${k}=${v}`, '')
        // console.info('serviceFunc->Cookie->set', { name, value, opts, hostname })
        document.cookie = name + '=' + encodeURIComponent(value) + optsStr
      }
    , delete: (name: string, opts: any) => Cookie.set(name, '', {'max-age': -1, ...opts}) 
    // path & domain must match cookie being deleted 
    }

/**
 * @description Returns true for devMode and false for production
 */
export const devModeTrueFalse: Function = (): boolean => {
  let devMode: boolean = false
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    devMode = true;
  }

  return devMode
}

