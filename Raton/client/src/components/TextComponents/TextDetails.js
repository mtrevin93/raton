import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import { Container } from "@mui/material";
import { getTextById } from "../../modules/textManager";
import { getUserWords, addUserWord, deleteUserWord } from "../../modules/wordManager";
import {Word} from "../WordComponents/Word";

export default function Hello() {

  const history = useHistory();

  const [text, setText] = useState({});
  const [userWords, setUserWords] = useState([]);

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
if (userWords?.length > 0)
{
  return(
<Word word = {userWords[1]} key = {userWords[1].id}/>
  )
}

//All comparisons of words should be done using regex&toLowerCase, but their values as sent should include punctuation

  return (
    <>

  <Container maxWidth="lg">
    {text.htmlString?.map((e) => {
      if (e.htmlString?.startsWith("p-lan1"))
      {
        return <p class="lan1"></p>
      }
      else if (e.htmlString?.startsWith("http"))
      {
        return <><br/><img src = {e.htmlString} class="" style={{width: "75%", height:"50%", margin: "auto", display:"block"}} class="center x-illo"/><br/></>
      }
      else if (e.htmlWord)
      {
        return(
        <><> </>
        <label id={e.htmlWord.Id} htmlFor={e} onClick={() => handleClickUpdateUserWords(e)} color={ userWords?.find(w => w.id === e.htmlWord.id) ? "green" : "red"} style={userWords?.find(w => w.id === e.htmlWord.id) ? {color: "green", fontSize: 30} : {color: "black", fontSize: 30}}>
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
  </Container>
</>
);}
