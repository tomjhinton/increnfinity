import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma'
import Home from './components/Home'
import './style.scss'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'



class App extends React.Component {
  render(){
    return (
      <Router>
        <main>

          <Switch>
            <Route  path="/" component={Home} />
          </Switch>
        </main>
      </Router>
    )
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
