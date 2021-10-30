import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Media, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';

export const Text = ({ text, user }) => {

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
      <Col xs={1}/>
      <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{fontSize: "14px", fontStyle: "italic", alignItems: "center"}}>
          ({text.distinctUserWords} words you're learning occur {text.userWords} times)
        </Typography>
      <Col xs={1}/>
    </Card>
    </Col>
  );
}
