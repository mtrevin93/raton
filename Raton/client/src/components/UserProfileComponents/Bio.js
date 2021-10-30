import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Media, Col } from 'reactstrap';

export const Bio = ({ user }) => {

  return (
    <Card sx={1}>
      <CardContent >
        <Typography variant="h4" component="div">
          {user.username}
        </Typography>
          <br/>
        <Media style={{justifyContent: "center"}}>
            <img src={user.avatarImg} style={{height: "300px", maxWidth: "auto"}}/>
        </Media>
        <br/>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{alignItems: "center"}}>
          {user.bio}
        </Typography>
      </CardContent>
      <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{fontSize: "14px", fontStyle: "italic", alignItems: "center"}}>
          {user?.userType?.typeName === "Admin" ? "Admin" : null}
        </Typography>
    </Card>
  );
}
