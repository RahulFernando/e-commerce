import React from 'react'
import HomePage from './containers/home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Products from './containers/products';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/:slug" component={Products} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
