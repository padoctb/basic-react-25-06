import React, {Component} from "react"
import {Route, NavLink} from 'react-router-dom'
import ArticlesListRoute from './routes/ArticlesListRoute'

class App extends Component {
  render() {
    return(
      <div data-react-app='app'>
        <NavLink activeStyle={{color: 'red'}} to='/articles'>Список статей</NavLink>
        <br/>
        <NavLink exact activeStyle={{color: 'red'}} to="/">На главную</NavLink>
        <Route path='/articles' component={ArticlesListRoute}/>
      </div>
    )
  }
}

export default App