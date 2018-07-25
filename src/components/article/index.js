import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentList from '../comment-list'
import Loader from '../common/loader'
import CSSTransition from 'react-addons-css-transition-group'
import { deleteArticle, loadArticle } from '../../ac'
import './style.css'
import { articleSelector } from '../../selectors'

class Article extends PureComponent {
  state = {
    error: null
  }

  componentDidCatch(error) {
    this.setState({ error })
  }

  componentDidMount() {
    const { loadArticle, article, id } = this.props

    if (!article || (!article.text && !article.loading)) loadArticle(id)
  }

  render() {
    const { article, isOpen } = this.props
    if (!article) return null

    return (
      <div className="test--article__container">
        <h3>
          {article.title}
          <button onClick={this.handleClick} className="test--article__btn">
            {isOpen ? 'close' : 'open'}
          </button>
          <button onClick={this.handleDelete}>delete me</button>
        </h3>
        <CSSTransition
          transitionName="article"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.body}
        </CSSTransition>
      </div>
    )
  }

  handleClick = () => this.props.toggleOpen(this.props.article.id)

  handleDelete = () => {
    const { article, deleteArticle } = this.props
    deleteArticle(article.id)
  }

  get body() {
    const { isOpen, article } = this.props
    if (!isOpen) return null
    if (article.loading) return <Loader key="loader" />

    return (
      <section className="test--article__body" key="body">
        {article.text}
        {!this.state.error && <CommentList article={article} />}
      </section>
    )
  }
}

Article.propTypes = {
  id: PropTypes.string.isRequired,
  // from connect
  article: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    comments: PropTypes.array
  }),

  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func.isRequired
}

export default connect(
  (state, ownProps) => ({
    article: articleSelector(state, ownProps)
  }),
  { deleteArticle, loadArticle }
)(Article)
