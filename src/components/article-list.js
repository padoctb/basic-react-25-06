import React, { Component } from 'react'
import Article from './article'
import accordion from '../decorators/accordion'
import PropTypes from 'prop-types'

export class ArticleList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    //props from decorator
    openItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    toggleOpenItem: PropTypes.func
  }

  componentDidMount() {
    this.props.fetchData && this.props.fetchData()
  }

  render() {
    console.log(this.props)
    return <ul>{this.articles}</ul>
  }

  get articles() {
    return this.props.articles.map((article) => (
      <li key={article.id} className="test--article-list__item">
        <Article
          article={article}
          isOpen={this.props.openItemId === article.id}
          toggleOpen={this.props.toggleOpenItem}
        />
      </li>
    ))
  }
}

export default accordion(ArticleList)
