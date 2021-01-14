import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./container/home";
import Signup from "./container/signup";
import Signin from "./container/singin";
import PrivateRoute from "./components/hoc/private";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from './actions/auth'

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [])

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
