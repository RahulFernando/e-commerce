import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import "./App.css";
import Home from './container/home';
import Signup from './container/signup';
import Signin from './container/singin';
import PrivateRoute from './components/hoc/private'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={Home}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
