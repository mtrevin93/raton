import * as React from 'react';
import { useEffect, useState } from 'react';
import { getUserWords } from '../../modules/wordManager';
import { VocabWord } from './VocabWord';

export const VocabList = () => {

const [userWords, setUserWords] = useState([])

useEffect(() => {
    getUserWords()
    .then(uw => setUserWords(uw))
  },[])

return(
    <div style={{padding: "2em", pargin: "2em"}}>
    <h1>Words You're Learning</h1>
    {userWords.map(uw => <VocabWord word = {uw} key = {uw.id} />)}
    </div>
)}