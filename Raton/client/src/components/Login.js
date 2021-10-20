import React, { useState } from "react";
import { Button, FormGroup,  FormControl, FormLabel, TextField } from '@mui/material';
import { useHistory, Link, Rout, BrowserRouter } from "react-router-dom";
import { login } from "../modules/authManager";

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <FormControl onSubmit={loginSubmit}>
      <fieldset>
        <FormGroup>
          <FormLabel for="email">Email</FormLabel>
          <TextField id="email" type="text" autoFocus onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <FormLabel for="password">Password</FormLabel>
          <TextField id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em>
            <BrowserRouter>
          Not registered? <Link to="register">Register</Link>
            </BrowserRouter>
        </em>
      </fieldset>
    </FormControl>
  );
}