import React, { Component } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import UserForm from './components/user-form'
import Filters from './components/filters'
import Counter from './components/counter'
import ArticlesRoute from './routes/articles'

class App extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <UserForm />
        <div>
          <div>
            <NavLink to="/articles" activeStyle={{ color: 'red' }}>
              articles
            </NavLink>
          </div>
          <div>
            <NavLink to="/filters" activeStyle={{ color: 'red' }}>
              filters
            </NavLink>
          </div>
          <div>
            <NavLink to="/counter" activeStyle={{ color: 'red' }}>
              counter
            </NavLink>
          </div>
        </div>
        <Switch>
          <Route path="/counter" component={Counter} exact />
          <Route path="/filters" component={Filters} />
          <Route
            path="/articles/new"
            render={() => <h1>New Article Form</h1>}
          />
          <Route path="/articles" component={ArticlesRoute} />
          <Route path="*" render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    )
  }
}

export default App
