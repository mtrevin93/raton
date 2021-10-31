import * as React from 'react';
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Media, Col } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import { getTranslation } from '../../modules/wordManager';
import { deleteUserWord } from '../../modules/wordManager';
import { getUserWords } from '../../modules/wordManager';

export const VocabWord = ({word, setUserWords}) => {

const [translation, setTranslation] = useState({});

useEffect(() => {
  getTranslation(word.spanishWord)
  .then(translation => setTranslation(translation))
},[])

const handleClickDelete = () => {
  const confirm = window.confirm("Are you sure you want to delete this?")
  if(confirm== true)
  deleteUserWord(word)
  .then(getUserWords)
  .then(uw => setUserWords(uw))
}

return (
<Col>
<Card sx={{ minWidth: 600 }} style={{margin: "0.2em"}}>
  <CardContent >
    <Typography variant="h4" component="div">
      {word.spanishWord}
    </Typography>
        <Typography variant="h5" component="div">
          {word.spanishWord}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {translation[0]?.sls}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {translation[0]?.fl}
        </Typography>
        <Typography variant="body2">
          {translation[0]?.shortdef?.toString()}
          <br />
        </Typography>
        <Button size="small" variant="outline-danger" style={{margin: "0.2em"}}onClick={() => handleClickDelete()}>Delete</Button>
      </CardContent>
</Card>
</Col>
)}