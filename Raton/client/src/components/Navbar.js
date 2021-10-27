import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({user}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography style={{color: "#FFCCBC"}}variant="h4" className={classes.title}>
        🐀Ratón
        </Typography>
        <Typography variant="h6" className={classes.title}>
          <Link style={{color: "#FFCCBC"}} to="/text">
          Browse
          </Link>
        </Typography>
        {user?.userType?.typeName === "Admin"?
        <Typography variant="h6" className={classes.title}>
          Post Text
        </Typography> : null }
        <Typography variant="h6" className={classes.title}>
          Title
        </Typography>
        <Typography variant="h6" className={classes.title}>
          Title
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
