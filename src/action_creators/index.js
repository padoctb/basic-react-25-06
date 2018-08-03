import {
  LOAD_ARTICLES,
  LOAD_ARTICLE,
  LOADING,
  LOADED,
  ERROR,
  DELETE_ARTICLE,
  LOAD_COMMENTS,
  ADD_COMMENT
} from './../constants'

export function loadArticles() {
  return (dispatch) => {
    dispatch({
      type: LOAD_ARTICLES + LOADING
    })

    fetch('/api/article')
      .then(res => res.json())
      .then(res => dispatch({
        type: LOAD_ARTICLES + LOADED,
        response: res
      }))
      .catch(error => dispatch({
        type: LOAD_ARTICLES + ERROR,
        payload: error
      }))
  }
}

export function loadArticle(id) {
  return (dispatch, store) => {
    dispatch({
      type: LOAD_ARTICLE + LOADING
    })

    fetch(`/api/article/${id}`)
      .then(res => res.json())
      .then(res => dispatch({
        type: LOAD_ARTICLE + LOADED,
        payload: id,
        response: res
      }))
      .catch(error => dispatch({
        type: LOAD_ARTICLE + ERROR,
        payload: error
      }))
  }
}

export function deleteArticle(id) {
  return {
    type: DELETE_ARTICLE,
    payload: id
  }
}

export function loadComments(articleId) {
  return (dispatch) => {
    dispatch({
      type: LOAD_COMMENTS + LOADING
    })

    fetch(`/api/comment?article=${articleId}`)
      .then(res => res.json())
      .then(res => dispatch({
        type: LOAD_COMMENTS + LOADED,
        payload: articleId,
        response: res
      }))
      .catch(error => dispatch({
        type: LOAD_COMMENTS + ERROR,
        payload: error
      }))
  }
}

export function addComment(comment, articleId) {
  return (dispatch) => {
    const randomId = +new Date() + 'x'

    comment.id = randomId

    dispatch({
      type: ADD_COMMENT,
      payload: {
        comment,
        articleId
      }
    })
  }
}