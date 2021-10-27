import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Login from './components/Login';
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  if (isLoggedIn === null) {
    return <Login/>
  }

  return (
    <Router>
      <ApplicationViews isLoggedIn={isLoggedIn}/>
    </Router>
  );
}

export default App;
