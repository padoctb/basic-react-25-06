import React, {Component} from "react"
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadArticle, deleteArticle} from './../../action_creators'
import {getArticleSelector} from "./../../selectors"
import Loader from './../../components/Loader'
import {Redirect, Route} from 'react-router-dom'
import CommentsList from "./../CommentsList"

class Article extends Component {

  state = {
    deleted: false
  }

  static propTypes = {
    //from route
    articleId: PropTypes.string.isRequired,
    //from connect
    loadArticle: PropTypes.func.isRequired,
    article: PropTypes.object
  } 

  render() {
    return(
      <div>
        {this.body}
      </div>
    )
  }

  get body() {
    const {article, articleId} = this.props

    if(this.state.deleted) return <Route render={() => <Redirect to="/articles"/>} path={`/articles/${this.props.articleId}`}/>;

    if(!article || !article.text) return <Loader/>;

    const body = (
      <div>
        <h2>{article.title}</h2>
        <span>{article.text}</span><br/>
        <button onClick={this.deleteArticle}>Удалить статью</button>
        <CommentsList key={articleId} articleId={articleId}/>
      </div>
    )

    return body
  }

  deleteArticle = () => {
    this.props.deleteArticle(this.props.articleId)
    this.setState({
      deleted: true
    })
  }

  componentDidMount() {
    const {article} = this.props
    if(article && !article.text) this.props.loadArticle(this.props.articleId)
  }

  componentDidUpdate() {
    const {article} = this.props
    if(article && !article.text) this.props.loadArticle(this.props.articleId)
  }
}

export default connect((store, {articleId}) => {
  return {
    article: getArticleSelector(store, articleId)
  }
}, {
  loadArticle,
  deleteArticle
})(Article)