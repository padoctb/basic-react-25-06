import {Map} from 'immutable'

export default function(arr, record) {
  return arr.reduce((prev, elem) => {
    return prev.set(elem.id, new record(elem))
  }, new Map({}))
}