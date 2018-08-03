import React, {Component} from "react"
import PropTypes from 'prop-types'

class Comment extends Component {

  static propTypes = {
    commentData: PropTypes.object.isRequired
  } 

  render() {
    const {commentData} = this.props
    return(
      <div>
        <h4>{commentData.user}</h4>
        <span>{commentData.text}</span>
      </div>
    )
  }
}

export default Comment