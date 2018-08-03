import {
  LOAD_ARTICLES,
  LOADING,
  LOADED,
  ERROR,
  LOAD_ARTICLE,
  DELETE_ARTICLE,
  ADD_COMMENT
} from './../constants'
import {Record} from 'immutable'
import arrToKeyValue from './../other/arrToKeyValue'

const ArticleRecord = Record({
  id: null,
  date: null,
  title: null,
  text: null,
  comments: [],
  loaded: false
})

const ArticlesRecord = Record({
  entities: arrToKeyValue([], ArticleRecord),
  loading: false,
  loaded: false,
  error: null
})

export default (prevState = new ArticlesRecord(), action) => {
  const {type, payload, response} = action
  switch (type) {
    case DELETE_ARTICLE:
      return prevState.removeIn(['entities', payload])

    case LOAD_ARTICLES + LOADING:
      return prevState.set('loading', true)

    case LOAD_ARTICLES + LOADED:
      return prevState
              .set('loading', false)
              .set('loaded', true)
              .set('entities', arrToKeyValue(response, ArticleRecord))

    case LOAD_ARTICLES + ERROR:
      console.log(payload)
      return prevState.set('error', payload)

    case LOAD_ARTICLE + LOADED:
      return prevState.setIn(['entities', payload, 'loaded'], true).setIn(['entities', payload], new ArticleRecord(response))

    case ADD_COMMENT:
      return prevState.updateIn(['entities', payload.articleId, 'comments'], comments => comments.concat(payload.comment.id))

    default:
      return prevState
  }
}