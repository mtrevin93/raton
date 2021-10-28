import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Media, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


export const Text = ({text, user}) => {

const history = useHistory();

const handleClickNavigate = () => {
    history.push(`/text/${text.id}`)
}

  return (
      <Col xs={3}>
    <Card sx={{ minWidth: 275 }}>
      <CardContent >
        <Typography variant="h4" component="div">
          {text.title}
        </Typography>
          <br/>
        <Media style={{justifyContent: "center"}} onClick={() => handleClickNavigate()}>
            <img src={text.headerImg} style={{height: "auto", maxWidth: "550px"}}/>
        </Media>
        <br/>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{alignItems: "center"}}>
          {text.description}
        </Typography>
      </CardContent>
      <CardActions>
      <Col xs={2}>
        <Button className="btn" variant="outline-primary"size="small">Read</Button>
      </Col>
      <Col xs={7}/>
      {user?.userType?.typeName === "Admin" ?
      <>
        <Button size="small" variant="outline-primary">Edit</Button>
        <Button size="small" variant="outline-danger">Delete</Button>
      </> : null}
      </CardActions>
    </Card>
    </Col>
  );
}
