import React from 'react'
import { Switch, Route } from 'react-router-dom'
import '../../Styles/App.scss'
import Home from '../Read/Home'
import EditEmployee from '../Update/EditEmployee'
import AddEmployee from '../Create/AddEmployee'
import DeleteEmployee from '../Delete/DeleteEmployee'

export default () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add" component={AddEmployee} />
        <Route exact path="/edit/:id" component={EditEmployee} />
        <Route exact path="/delete/:id" component={DeleteEmployee} />
      </Switch>
    </div>
  )
}
