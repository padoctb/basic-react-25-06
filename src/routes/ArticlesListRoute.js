import React, {Component} from "react"
import ArticlesList from "./../components/ArticlesList"
import {Route} from 'react-router-dom'
import Article from './../components/Article'

class ArticlesListRoute extends Component {

  render() {
    return(
      <div>
        <Route path='/articles' component={ArticlesList}/>
        <Route exact path='/articles/:id' render={this.getArticle}/>
      </div>
    )
  }

  getArticle = ({match}) => {
    return <Article articleId={match.params.id}/>
  }
}

export default ArticlesListRoute