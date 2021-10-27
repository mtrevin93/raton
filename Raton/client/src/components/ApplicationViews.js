import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import TextDetails from "./TextComponents/TextDetails"
import Navbar from "./Navbar";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Navbar/>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/text/:id" exact>
          {isLoggedIn ? <TextDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
}
