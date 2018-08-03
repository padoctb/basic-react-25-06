import {combineReducers} from "redux"
import articlesReducer from './articlesReducer'
import commentsReducer from './commentsReducer'

export default combineReducers({
  articles: articlesReducer,
  comments: commentsReducer
})