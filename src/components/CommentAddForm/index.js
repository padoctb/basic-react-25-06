import React, {Component} from "react"
import "./style.css"
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addComment} from "./../../action_creators"

class CommentAddForm extends Component {

  static propTypes = {
    articleId: PropTypes.string.isRequired
  } 

  state = {
    usernameValue: '',
    commentTextValue: ''
  }

  render() {
    const {usernameValue, commentTextValue} = this.state
    return(
      <div className="comment__form">
        <h3>Оставить коммент</h3>
        <form onSubmit={(e) => this.commentFormSubmit(e)}>
        <input
          className={usernameValue.length > 3 ? 'comment__input' : 'comment__input comment__input--no-active'}
          placeholder='Имя'
          value={usernameValue}
          onChange={(e) => this.changeUsernameValue(e)}/>

        <br/>

        <textarea
          className={commentTextValue.length > 6 ? 'comment_textarea comment__input' : 'comment_textarea comment__input comment__input--no-active'}
          placeholder='Текст комментария'
          value={commentTextValue}
          onChange={(e) => this.changeCommentTextValue(e)}/>

          <br/>

          <button type='submit'>Отправить комментарий</button>
        </form>

      </div>
    )
  }

  commentFormSubmit = (e) => {
    e.preventDefault()

    const {usernameValue, commentTextValue} = this.state

    if(usernameValue.length > 3 && commentTextValue.length > 6) {
      this.props.addComment({
        user: usernameValue,
        text: commentTextValue
      }, this.props.articleId)
    }
    else alert("NO")
  }

  changeCommentTextValue(e) {
    if(e.target.value.length >= 100) return;

    this.setState({
      commentTextValue: e.target.value
    })
  }

  changeUsernameValue(e) {
    if(e.target.value.length >= 10) return;

    this.setState({
      usernameValue: e.target.value
    })
  }
}

export default connect(null, {
  addComment
})(CommentAddForm)