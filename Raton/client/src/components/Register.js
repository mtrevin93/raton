import React, { useState } from "react";
import { Button, FormGroup, Input, FormLabel, FormControl } from '@mui/material';
import { useHistory } from "react-router-dom";
import { register } from "../modules/authManager";

export default function Register() {
  const history = useHistory();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [imageLocation, setImageLocation] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { firstName, lastName, displayName, imageLocation, email };
      register(userProfile, password)
        .then(() => history.push("/"));
    }
 };

  return (
    <FormControl onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="displayName">Display Name</FormLabel>
          <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <FormLabel for="email">Email</FormLabel>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="imageLocation">Profile Image URL</FormLabel>
          <Input id="imageLocation" type="text" onChange={e => setImageLocation(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <FormLabel for="password">Password</FormLabel>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <FormLabel for="confirmPassword">Confirm Password</FormLabel>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </FormControl>
  );
}
