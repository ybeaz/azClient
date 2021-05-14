/**
 * @description Function to filter the first object of the object group with prop in an array of objects
 */
export const filterArrObjFirst: Function = (
  arrObj: any[],
  prop: string
): any => {
  const arrObjNext: any[] = []

  arrObj.forEach((obj: any) => {
    const propName: string = obj[prop]
    if (arrObjNext.every((item: any) => !item[propName])) {
      // console.info('serviceFunc->filterArrObjFirst ', { 'obj[prop]': obj[prop], obj, prop, arrObj })

      const eventTypeArr: string[] = obj[prop]
        .replace(/^(utAzAction_)([\S]*?)$/gim, '$2')
        .split('_')
      const [eventType, eventName, eventLevel] = eventTypeArr
      const eventLevelNext: number =
        eventLevel !== undefined ? parseInt(eventLevel, 10) : 0
      arrObjNext.push({
        ...obj,
        type: eventType,
        name: eventName,
        level: eventLevelNext,
        [propName]: true,
      })
    }
  })

  return arrObjNext
}

/**
 * @description Function to serialize object or array for get request
 */
export const serialize: Function = (obj: any, prefix: string): string => {
  const arr: any[] = []
  Object.keys(obj).forEach((key: string) => {
    const k: string = prefix ? `${prefix}[${key}]` : key
    const v: any = obj[key]
    arr.push(
      v !== null && typeof v === 'object'
        ? serialize(v, k)
        : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
    )
  })

  return arr.join('&')
}

/**
 * @description Function to define endpoing (dev, prod mode)
 */
export const getEndpoint: Function = (location: Location): string => {
  const { protocol, port, hostname } = location
  let endpoint: string = 'https://nd.userto.com/graphql'
  if (hostname === '127.0.0.1') {
    // endpoint = `http://127.0.0.1:8081/api/apiP2p/2.0`
    endpoint = `http://127.0.0.1:8082/graphql`
  }
  // console.info('serviceFunc->getEndpoint', { endpoint, location })
  return endpoint
}

/**
 * @description Function to check if the var is "empty" (analogy of php empty)
 */
const empty: Function = (mixedVar: any): boolean => {
  // console.info('empty', { mixedVar })
  if (!mixedVar || mixedVar === '0') {
    return true
  }

  if (typeof mixedVar === 'object') {
    for (var k in mixedVar) {
      return false
    }
    return true
  }

  if (toString.call(mixedVar) === '[object Array]' && mixedVar.length === 0) {
    return true
  } else if (
    toString.call(mixedVar) === '[object Array]' &&
    mixedVar.length > 0
  ) {
    return false
  }
  return false
}

/**
 * @description Function to convert variables into array
 */
const mixedVarToArray: Function = (mixedVar: any): any[] => {
  let output
  if (mixedVar === undefined) {
    output = []
  } else if (typeof mixedVar === 'string') {
    output = [mixedVar]
  } else {
    output = mixedVar
  }
  return output
}

/**
 * @description Function to merge two mixed variables into std. arrays, (analogy of php array_merge)
 */
const array_merge: Function = (dataNext, data): any => {
  const dataNext1 = mixedVarToArray(dataNext)
  const data1 = mixedVarToArray(data)
  // console.info('array_merge', { dataNext1, data1, dataNext, data })
  return [...data1, ...dataNext1]
}

/**
 * @description Function to filter data to array with unique values
 */
const array_unique: Function = (data: any[]): any[] => {
  const x: any[] = data.slice().sort()
  const temp: any[] = []
  let index: number = 0
  for (let i: number = 0; i < x.length; i += 1) {
    if (
      x[i] !== undefined &&
      JSON.stringify(x[i]) !== JSON.stringify(x[i + 1])
    ) {
      temp[index] = x[i]
      index += 1
    }
  }

  return temp
}

/**
 * @description Function to filter array (analogy of php array_filter)
 */
const array_filter: Function = (data: any): any => {
  return data.filter((item: any) => JSON.stringify(item) !== JSON.stringify([]))
}

/**
 * @description Function to get array to save covering various cases
 */
export const getArrToSave: Function = (
  record,
  dataInp,
  caseOption,
  target,
  prop
): any => {
  // console.info('getArrToSave [0]', { record, dataInp, caseOption, target })
  const record0 = record && record[0] ? record[0] : ''
  const dataInp0 = dataInp && dataInp[0] ? dataInp[0] : ''
  const target0 = target && target[0] ? target[0] : ''
  let dataNext
  // console.info('getArrToSave [2]', { record0, dataInp0, caseOption, target })

  if (caseOption === 'add') {
    if (empty(record0) === true && empty(dataInp0) === true) {
      dataNext = []
    } else if (empty(record0) === false && empty(dataInp0) === true) {
      dataNext = record
    } else if (empty(record0) === true && empty(dataInp0) === false) {
      dataNext = dataInp
    } else if (empty(record0) === false && empty(dataInp0) === false) {
      dataNext = array_merge(record, dataInp)
      // console.info('getArrToSave [5]', { dataNext, dataInp, record })
      dataNext = array_unique(dataNext)
      // console.info('getArrToSave [7]', { dataNext })
      dataNext = array_filter(dataNext)
      // console.info('getArrToSave [9]', { dataNext })
    }
  }

  if (caseOption === 'addAll') {
    if (empty(record0) === true && empty(dataInp0) === true) {
      dataNext = []
    } else if (empty(record0) === false && empty(dataInp0) === true) {
      dataNext = record
    } else if (empty(record0) === true && empty(dataInp0) === false) {
      dataNext = dataInp
    } else if (empty(record0) === false && empty(dataInp0) === false) {
      dataNext = array_merge(record, dataInp)
      dataNext = array_filter(dataNext)
    }
  } else if (caseOption === 'new') {
    // console.info('getArrToSave', { record0, 'empty(record0)': empty(record0), dataInp0, 'empty(dataInp0)': empty(dataInp0), dataInp, record })

    if (empty(record0) === true && empty(dataInp0) === true) {
      dataNext = []
    } else if (empty(record0) === false && empty(dataInp0) === true) {
      dataNext = record
    } else if (empty(record0) === true && empty(dataInp0) === false) {
      dataNext = dataInp
    } else if (
      empty(record0) === false &&
      empty(dataInp0) === false &&
      target0 === 'startSession'
    ) {
      dataNext = array_merge(dataInp, record)
    } else if (
      empty(record0) === false &&
      empty(dataInp0) === false &&
      target0 !== 'startSession'
    ) {
      dataNext = dataInp
    }
  } else if (caseOption === 'max') {
    if (dataInp0 === 'registration02') {
      dataNext = dataInp
    } else if (dataInp0 === 'registration01' && record0 !== 'registration02') {
      dataNext = dataInp
    } else if (record0 === 'registration02') {
      dataNext = record
    } else if (empty(record0) === true && empty(dataInp0) === true) {
      dataNext = []
    } else if (empty(record0) === true && empty(dataInp0) === false) {
      dataNext = dataInp
    } else if (empty(record0) === false && empty(dataInp0) === true) {
      dataNext = record0
    } else if (empty(record0) === false && empty(dataInp0) === false) {
      dataNext = dataInp
    }
  }

  return dataNext
}

/**
 * @description Function to return width of the DOM object's in crossbrowser style
 */
export const mediaSizeCrossBrowser: Function = (w: Window) => {
  // Use serviceFunc.mediaSizeCrossBrowser(global)
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

/**
 * @description Cookie: get, set, delete
 * @link https://stackoverflow.com/a/48706852/4791116
 * @link http://usejsdoc.org/
 */
export const Cookie = {
  get: (name: string) => {
    let c = document.cookie.match(
      `(?:(?:^|.*; *)${name} *= *([^;]*).*$)|^.*$`
    )[1]
    if (c) return decodeURIComponent(c)
  },
  set: (name: string, value: string, opts: any = {}) => {
    if (opts.days) {
      opts['max-age'] = opts.days * 60 * 60 * 24
      delete opts.days
    }
    const { hostname } = location
    if (hostname === '127.0.0.1') {
      delete opts.domain
    }
    const optsStr = Object.entries(opts).reduce(
      (str, [k, v]) => `${str}; ${k}=${v}`,
      ''
    )
    // console.info('serviceFunc->Cookie->set', { name, value, opts, hostname })
    document.cookie = name + '=' + encodeURIComponent(value) + optsStr
  },
  delete: (name: string, opts: any) =>
    Cookie.set(name, '', { 'max-age': -1, ...opts }),
  // path & domain must match cookie being deleted
}

/**
 * @description Returns true for devMode and false for production
 */
export const devModeTrueFalse: Function = (): boolean => {
  let devMode: boolean = false
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    devMode = true
  }

  return devMode
}
