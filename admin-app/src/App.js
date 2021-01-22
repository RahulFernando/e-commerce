import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from './actions/auth'
import { getAllCategories } from "./actions";

// pages and private routes
import Home from "./container/home";
import Signup from "./container/signup";
import Signin from "./container/singin";
import PrivateRoute from "./components/hoc/private";
import Products from "./container/products";
import Orders from "./container/orders";
import Category from "./container/category";
import { getAll } from "./actions/product";

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
      dispatch(getAllCategories())
      dispatch(getAll());
    }
  }, [])

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/category" component={Category} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
