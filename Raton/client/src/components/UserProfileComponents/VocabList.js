import * as React from 'react';
import { useEffect, useState } from 'react';
import { getUserWords } from '../../modules/wordManager';

export const VocabWord = () => {

const [userWords, setUserWords] = useState([])

useEffect(() => {
    getUserWords()
    .then(uw => setUserWords(uw))
  },[])

return(
    userWords.map(uw => <VocabWord word = {uw} key = {uw.id} />)
)}