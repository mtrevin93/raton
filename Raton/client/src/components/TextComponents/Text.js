import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { getTranslation } from '../../modules/wordManager';

export const Text = () => {

const [texts, setTexts] = useState({});

useEffect(() => {
  getAllTexts()
  .then(texts => setTexts(texts))
},[])

  return (
    <Card sx={{ minWidth: 275 }}>
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
