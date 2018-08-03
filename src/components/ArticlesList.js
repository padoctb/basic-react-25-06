import React, {PureComponent} from "react"
import {connect} from 'react-redux'
import {getArticlesSelector, getArticlesLoadedSelector} from './../selectors'
import PropTypes from 'prop-types'
import Loader from "./Loader"
import {loadArticles} from './../action_creators'
import {NavLink} from 'react-router-dom'

class ArticlesList extends PureComponent {

  static propTypes = {
    //from connect(selectors)
    articles: PropTypes.object.isRequired,
    loaded: PropTypes.bool.isRequired
  } 

  render() {
    return(
      <div>
        {this.body}
      </div>
    )
  }

  get body() {
    const {articles, loaded} = this.props

    if(!loaded) return <Loader/>;

    const body = articles.valueSeq().toArray().map(elem => {
      return <li key={elem.id}><NavLink activeStyle={{color: 'red'}} to={`/articles/${elem.id}`}>{elem.title}</NavLink></li>
    })

    return <ul>{body}</ul>
  }

  componentDidMount() {
    if(!this.props.loaded) this.props.loadArticles()
  }
}

export default connect((store) => ({
  articles: getArticlesSelector(store),
  loaded: getArticlesLoadedSelector(store)
}), {
  loadArticles
})(ArticlesList)