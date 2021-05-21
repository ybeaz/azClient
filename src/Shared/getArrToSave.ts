import { arrayFilter } from './arrayFilter'
import { arrayUnique } from './arrayUnique'
import { arrayMerge } from './arrayMerge'
import { isEmpty } from './isEmpty'

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
  const record0 = record && record[0] ? record[0] : ''
  const dataInp0 = dataInp && dataInp[0] ? dataInp[0] : ''
  const target0 = target && target[0] ? target[0] : ''
  let dataNext

  if (caseOption === 'add') {
    if (isEmpty(record0) === true && isEmpty(dataInp0) === true) {
      dataNext = []
    } else if (isEmpty(record0) === false && isEmpty(dataInp0) === true) {
      dataNext = record
    } else if (isEmpty(record0) === true && isEmpty(dataInp0) === false) {
      dataNext = dataInp
    } else if (isEmpty(record0) === false && isEmpty(dataInp0) === false) {
      dataNext = arrayMerge(record, dataInp)
      dataNext = arrayUnique(dataNext)
      dataNext = arrayFilter(dataNext)
    }
  }

  if (caseOption === 'addAll') {
    if (isEmpty(record0) === true && isEmpty(dataInp0) === true) {
      dataNext = []
    } else if (isEmpty(record0) === false && isEmpty(dataInp0) === true) {
      dataNext = record
    } else if (isEmpty(record0) === true && isEmpty(dataInp0) === false) {
      dataNext = dataInp
    } else if (isEmpty(record0) === false && isEmpty(dataInp0) === false) {
      dataNext = arrayMerge(record, dataInp)
      dataNext = arrayFilter(dataNext)
    }
  } else if (caseOption === 'new') {
    if (isEmpty(record0) === true && isEmpty(dataInp0) === true) {
      dataNext = []
    } else if (isEmpty(record0) === false && isEmpty(dataInp0) === true) {
      dataNext = record
    } else if (isEmpty(record0) === true && isEmpty(dataInp0) === false) {
      dataNext = dataInp
    } else if (
      isEmpty(record0) === false &&
      isEmpty(dataInp0) === false &&
      target0 === 'startSession'
    ) {
      dataNext = arrayMerge(dataInp, record)
    } else if (
      isEmpty(record0) === false &&
      isEmpty(dataInp0) === false &&
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
    } else if (isEmpty(record0) === true && isEmpty(dataInp0) === true) {
      dataNext = []
    } else if (isEmpty(record0) === true && isEmpty(dataInp0) === false) {
      dataNext = dataInp
    } else if (isEmpty(record0) === false && isEmpty(dataInp0) === true) {
      dataNext = record0
    } else if (isEmpty(record0) === false && isEmpty(dataInp0) === false) {
      dataNext = dataInp
    }
  }

  return dataNext
}
