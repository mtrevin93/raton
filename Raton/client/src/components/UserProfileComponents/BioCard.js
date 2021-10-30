import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Media, Col } from 'reactstrap';

export const Text = ({ user }) => {

  return (
      <Col xs={3}>
    <Card sx={{ minWidth: 275 }}>
      <CardContent >
        <Typography variant="h4" component="div">
          {user.username}
        </Typography>
          <br/>
        <Media style={{justifyContent: "center"}} onClick={() => handleClickNavigate()}>
            <img src={user.avatarImg} style={{height: "auto", maxWidth: "550px"}}/>
        </Media>
        <br/>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{alignItems: "center"}}>
          {user.bio}
        </Typography>
      </CardContent>
      <Col xs={1}/>
      <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{fontSize: "14px", fontStyle: "italic", alignItems: "center"}}>
          {user.userType.typeName === "Admin" ? "Admin" : null}
        </Typography>
      <Col xs={1}/>
    </Card>
    </Col>
  );
}
