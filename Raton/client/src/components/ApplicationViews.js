import React from "react";
import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import TextDetails from "./TextComponents/TextDetails"
import Navbar from "./Navbar";
import { getCurrentUser } from "../modules/authManager";
import {TextForm} from "./TextComponents/TextForm"
import { TextList } from "./TextComponents/TextList";
import { UserProfile } from "./UserProfileComponents/UserProfile";

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
          {isLoggedIn ? <TextList user={user} key ={user.id}/> : <Redirect to="/login" />}
        </Route>

        <Route path="/text" exact>
          {isLoggedIn ? <TextList forceRefresh={true} user={user} key ={user.id}/> : <Redirect to="/login" />}
        </Route>

        <Route path="/text/create" exact>
          {isLoggedIn ? 
            user?.userType?.typeName === "Admin" ? <TextForm/> 
            : <TextList user={user} key ={user.id}/>                                                                              
           : <Redirect to="/login" />}
        </Route>

        <Route path="/text/edit/:id" exact>
          {isLoggedIn ? 
            user?.userType?.typeName === "Admin" ? <TextForm/> 
            : <TextList user={user} key ={user.id}/>                                                                               
           : <Redirect to="/login" />}
        </Route>

        <Route path="/text/:id" exact>
          {isLoggedIn ? <TextDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/profile" exact>
          {isLoggedIn ? <UserProfile forceRefresh={true} user={user} key ={user.id}/> : <Redirect to="/login" />}
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
