import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import { getTextById, userRead } from "../../modules/textManager";
import { getUserWords, addUserWord, deleteUserWord } from "../../modules/wordManager";
import {Word} from "../WordComponents/Word";
import Grid from '@material-ui/core/Grid'
import './TextDetails.css';

export default function TextDetails() {

  const history = useHistory();

  const [text, setText] = useState({});
  const [userWords, setUserWords] = useState([]);
  const [translationWord, setTranslationWord] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getTextById(id)
    .then(text => setText(text))
    .then(getUserWords)
    .then(uw => setUserWords(uw))
  },[])

const handleClickUpdateUserWords = (e) => {
  console.log(userWords);
  console.log(e.htmlWord.id);
  if (userWords.find(w => w.id === e.htmlWord.id))
  {
    deleteUserWord(e.htmlWord)
    .then(getUserWords)
    .then(uw => setUserWords(uw));
  }
  else
  {
    addUserWord(e.htmlWord)
    .then(getUserWords)
    .then(uw => setUserWords(uw))
  }
}

const handleSetWord = (e) => {
  setTranslationWord(e.htmlWord);
}

const handleClickRead = () => {
  userRead(id)
  .then(history.push("/text"))
}

let nextLetterCapital = true

const setNextLetter = () => {

  if(nextLetterCapital === true)
  {
    nextLetterCapital = false
  }
  else if (nextLetterCapital === false)
  {
    nextLetterCapital = true;
  }
}

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  return (
    <>
  <Grid container maxWidth="lg">
    <Grid item xs={1}/>
    <Grid item sx= {{m: 6}} xs={2}>
    {translationWord.spanishWord? <Word word = {translationWord} key = {translationWord.id}/> : null}
    </Grid>
    <Grid item xs={1}/>
    <Grid item xs={6}>
    {text.htmlString?.map((e) => {
      if (e.htmlString?.startsWith("p-lan1"))
      {
        return<p class="lan1"></p>
      }
      else if (e.htmlString?.startsWith("http"))
      {
        return <><br/><img src = {e.htmlString} class="" style={{width: "auto", height:"auto", margin: "auto", display:"block"}} class="center x-illo"/><br/></>
      }
      else if (e.htmlWord)
      {
        return(
        <><> </>
        <label id={e.htmlWord.id} className = "text" htmlFor={e} onMouseEnter={() => handleSetWord(e)} onClick={() => handleClickUpdateUserWords(e)} color={ userWords?.find(w => w.id === e.htmlWord.id) ? "green" : "red"} style={userWords?.find(w => w.id === e.htmlWord.id) ? {color: "green", fontSize: 30} : {color: "black", fontSize: 30}}>
        {nextLetterCapital === true ? `${capitalizeFirstLetter(e.htmlWord.spanishWord)}` : `${e.htmlWord.spanishWord}`}</label>
        {nextLetterCapital === true ? setNextLetter() : null}
        </>
      )}  
      else
      {
        if (nextLetterCapital === true)
        {
          return
        }
        const punctuationTest = e.htmlString.replaceAll(/[!".¡?]/g,"");
        if(punctuationTest.length < e.htmlString.length)
        {
          setNextLetter();
        }
          return <text style={{color: "black", fontSize: 30}}>{`${e.htmlString}`}</text>
      }
    }
  )}
  <button style={{float: "right", margin: "1em"}} type="submit" class="btn btn-primary m-6" onClick={() => {
                    handleClickRead()
                }}>Done</button>
  </Grid>
  </Grid>
</>
);}
