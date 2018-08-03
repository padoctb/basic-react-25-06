import {
  LOAD_COMMENTS,
  LOADED,
  ADD_COMMENT
} from './../constants'
import {Record, Map, List} from 'immutable'
import arrToKeyValue from "./../other/arrToKeyValue"

const CommentRecord = Record({
  id: null,
  user: null,
  text: null
})

const CommentsRecord = Record({
  entities: new Map({}),
  loaded: new List([])
})

export default (prevState = new CommentsRecord(), action) => {
  const {type, payload, response} = action
  switch (type) {
    case LOAD_COMMENTS + LOADED:
      return prevState
                .setIn(['entities', payload], arrToKeyValue(response, CommentRecord))
                .update('loaded', arr => {
                  return arr.includes(payload) ? arr : arr.push(payload)
                })

    case ADD_COMMENT:
      return prevState.setIn(['entities', payload.articleId, payload.comment.id], new CommentRecord(payload.comment))

    default:
      return prevState
  }
}