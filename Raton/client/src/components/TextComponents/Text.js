import * as React from 'react';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Media, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { deleteText, getTexts } from '../../modules/textManager';


export const Text = ({text, user, setTexts}) => {

const history = useHistory();

const handleClickNavigate = () => {
    history.push(`/text/${text.id}`)
}

const handleClickDelete = () => {
    const confirm = window.confirm("Are you sure you want to delete this?")
    if(confirm== true)
    console.log(text)
    deleteText(text.id)
    .then(getTexts)
    .then(res => setTexts(res))   
}

const handleClickEdit = () => {
    history.push(`/text/edit/${text.id}`)
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
      <Col xs={1}>
        <Button className="btn" variant="outline-primary"size="small"onClick={() => handleClickNavigate()}>Read</Button>
      </Col>
      <Col xs={1}/>
      <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{fontSize: "14px", fontStyle: "italic", alignItems: "center"}}>
          ({text.distinctUserWords} words you're learning occur {text.userWords} times)
        </Typography>
      <Col xs={1}/>
      {user?.userType?.typeName === "Admin" ?
      <>
        <Button size="small" variant="outline-primary"onClick={() => handleClickEdit()}>Edit</Button>
        <Button size="small" variant="outline-danger" onClick={() => handleClickDelete()}>Delete</Button>
      </> : null}
      </CardActions>
    </Card>
    </Col>
  );
}
