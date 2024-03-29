import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { logout } from "../modules/authManager";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom"

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({user}) => {

const history = useHistory();

const classes = useStyles();
const [open, setOpen] = useState(false);

const handleClickLogout = () => {
  logout();
  history.push("/");
}

const handleClickGoBack = () => {
  history.goBack();
}

  return (
    <AppBar position="static">
      <Toolbar>
      <Typography style={{color: "#ef9a9a", cursor:"pointer"}}variant="h4" className={classes.title} onClick={() => handleClickGoBack()}>
        Back
      </Typography>
        <Typography style={{color: "#ef9a9a"}}variant="h4" className={classes.title}>
        <Link style={{color: "#ef9a9a", textDecoration: 'none'}} to="/">
        Home
          </Link>
        </Typography>
        {/* <Typography variant="h4" className={classes.title}>
          <Link style={{color: "#ef9a9a",textDecoration: 'none'}} to="/text">
          Browse
          </Link>
        </Typography> */}
        {user?.userType?.typeName === "Admin" ?
        <Typography variant="h4" style={{color: "#ef9a9a"}}className={classes.title}>
          <Link style={{color: "#ef9a9a",textDecoration: 'none'}} to="/text/create">
          Post
          </Link>
        </Typography> : null }
        <Typography variant="h4" className={classes.title}>
          <Link style={{color: "#ef9a9a",textDecoration: 'none'}} to="/profile">
          Profile
          </Link>
        </Typography>
        <Typography variant="h6" style={{color: "#ef9a9a"}}className={classes.title}>
        <Button style={{color: "#ef9a9a"}} onClick = {() => handleClickLogout()}>Logout</Button>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
