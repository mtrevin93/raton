import * as React from 'react';
import { useEffect, useState } from 'react';
import { getUserWords } from '../../modules/wordManager';
import { VocabWord } from './VocabWord';
import { Container, Col } from 'reactstrap';

export const VocabList = () => {

const [userWords, setUserWords] = useState([])

useEffect(() => {
    getUserWords()
    .then(uw => setUserWords(uw))
  },[])

  const splitEvery = (array, length) =>
  array.reduce(
    (result, item, index) => {
      if ( index % length === 0 ) result.push([])
      result[Math.floor(index / length)].push(item)
      return result
    },
    []
  )

  return (
    <>
    {splitEvery(userWords, 3).map(wordsChunk => (
        <div className="columns">
          { wordsChunk.map( uw => (
              <div className="column">
                <VocabWord key={uw.id} word={uw} />
              </div>
            ))
          }
        </div>
      )
    )}
    </>
  )}