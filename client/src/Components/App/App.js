import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.scss'

import Home from '../Read/Home'
import EditEmployee from '../Update&Delete/EditEmployee'
import AddEmployee from '../Create/AddEmployee'

export default () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add" component={AddEmployee} />
        <Route exact path="/edit/:id" component={EditEmployee} />
      </Switch>
    </div>
  )
}
