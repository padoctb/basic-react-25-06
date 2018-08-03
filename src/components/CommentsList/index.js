import React, {Component} from "react"
import openToggle from "./../../decorators/openToggle"
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadComments} from "./../../action_creators"
import Loader from "./../../components/Loader"
import {getCommentsSelector, getCommentsLoadedSelector} from "./../../selectors"
import Comment from "./../Comment"
import CommentAddForm from "./../CommentAddForm"

class CommentsList extends Component {

  static propTypes = {
    //from decorator
    toggleOpen: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    //from article
    articleId: PropTypes.string.isRequired,
    //from connect
    comments: PropTypes.object,
    commentsLoaded: PropTypes.bool.isRequired
  } 

  render() {
    const {toggleOpen, isOpen} = this.props
    return(
      <div>
        <button onClick={toggleOpen}>{!isOpen ? 'Показать комментарии' : 'Закрыть комментарии'}</button>
        {this.body}
      </div>
    )
  }

  get body() {
    const {isOpen, comments, articleId} = this.props

    if(!isOpen) return null;

    if(!comments) return <Loader/>;

    const body = comments.valueSeq().toArray().map(elem => {
      return <li key={elem.id}><Comment commentData={elem}/></li>
    })

    return (
      <div>
        <ul>
          {body.length === 0 ? 'Комментариев нет.' : body}
        </ul>
        <CommentAddForm articleId={articleId}/>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const {isOpen, articleId, commentsLoaded} = this.props
    if(!prevProps.isOpen && isOpen && !commentsLoaded) this.props.loadComments(articleId)
  }
}

export default connect((store, ownProps) => {
  return {
    comments: getCommentsSelector(store, ownProps.articleId),
    commentsLoaded: getCommentsLoadedSelector(store, ownProps.articleId)
  }
}, {
  loadComments
})(openToggle(CommentsList))