import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import { getTextById } from "../../modules/textManager";
import { getUserWords, addUserWord, deleteUserWord } from "../../modules/wordManager";
import {Word} from "../WordComponents/Word";
import Grid from '@material-ui/core/Grid'

export default function Hello() {

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
    console.log("deleted")
  }
  else
  {
    addUserWord(e.htmlWord)
    .then(getUserWords)
    .then(uw => setUserWords(uw))
    console.log("added")
  }
}

const handleSetWord = (e) => {
  setTranslationWord(e.htmlWord);
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
        return <p class="lan1"></p>
      }
      else if (e.htmlString?.startsWith("http"))
      {
        return <><br/><img src = {e.htmlString} class="" style={{width: "auto", height:"auto", margin: "auto", display:"block"}} class="center x-illo"/><br/></>
      }
      else if (e.htmlWord)
      {
        return(
        <><> </>
        <label id={e.htmlWord.Id} htmlFor={e} onMouseEnter={() => handleSetWord(e)} onClick={() => handleClickUpdateUserWords(e)} color={ userWords?.find(w => w.id === e.htmlWord.id) ? "green" : "red"} style={userWords?.find(w => w.id === e.htmlWord.id) ? {color: "green", fontSize: 30} : {color: "black", fontSize: 30}}>
        {`${e.htmlWord.spanishWord}`}</label>

        {/* <input class={`wordCheckbox${e.id}`} style={{display: "none"}} onChange="null" id={e.id} type="checkbox" 
        defaultChecked={userWords?.find(w => w.id === e.id) ? "checked" : ""} name={e}></input> */}
        </>
      )}  
      else
      {
        return <text style={{color: "black", fontSize: 30}}>{`${e.htmlString}`}</text>
      }
    }
  )}
  </Grid>
  </Grid>
</>
);}
