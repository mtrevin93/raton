import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTranslation } from '../../modules/wordManager';

export const Word = ({word}) => {

const [translation, setTranslation] = useState({});

useEffect(() => {
  getTranslation(word.spanishWord)
  .then(translation => setTranslation(translation))
},[])

  return (
    <Card sx={{ minWidth: 275, position: "fixed", top: "10%"}}>
      <CardContent>
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
      </CardContent>
      <CardActions>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}
