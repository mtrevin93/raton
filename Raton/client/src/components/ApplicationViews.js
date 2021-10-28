import React from "react";
import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import TextDetails from "./TextComponents/TextDetails"
import Navbar from "./Navbar";
import { getCurrentUser } from "../modules/authManager";
import {TextForm} from "./TextComponents/TextForm"
import { TextList } from "./TextComponents/TextList";

export default function ApplicationViews({ isLoggedIn }) {

const [user, setUser] = useState({});

useEffect(() => {
  if (isLoggedIn)
  {
    getCurrentUser()
    .then(user => setUser(user))
  }
},[isLoggedIn])

  return (
    <main>
      {isLoggedIn ? <Navbar user={user} key={user.id}/> : null}
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/text" exact>
          {isLoggedIn ? <TextList user={user} key ={user.id}/> : <Redirect to="/login" />}
        </Route>

        <Route path="/text/create" exact>
          {isLoggedIn ? 
            user?.userType?.typeName === "Admin" ? <TextForm/> 
            : <Hello />                                                                               
           : <Redirect to="/login" />}
        </Route>

        <Route path="/text/edit/:id" exact>
          {isLoggedIn ? 
            user?.userType?.typeName === "Admin" ? <TextForm/> 
            : <Hello />                                                                               
           : <Redirect to="/login" />}
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
