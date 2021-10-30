import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Media, Col } from 'reactstrap';
import { getTranslation } from '../../modules/wordManager';

export const VocabWord = ({word}) => {


const [translation, setTranslation] = useState({});

useEffect(() => {
  getTranslation(word.spanishWord)
  .then(translation => setTranslation(translation))
},[])


return (
<Col xs={2}>
<Card sx={{ minWidth: 100 }}>
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
      </CardContent>
</Card>
</Col>
)}