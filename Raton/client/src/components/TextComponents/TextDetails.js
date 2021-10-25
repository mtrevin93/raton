import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import { Container } from "@mui/material";
import { getTextById } from "../../modules/textManager";
import { getUserWords } from "../../modules/wordManager";

export default function Hello() {

  const history = useHistory();

  const [text, setText] = useState({});
  const [userWords, setUserWords] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    getTextById(id)
    .then(text => setText(text))
    .then(getUserWords())
    .then(uw => setUserWords(uw))
  },[])

const handleClickUpdateUserWords = () => {
  if (checkedState === true)
  {
    checkedState = false;
  }
  else if (checkedState === false)
  {
    checkedState = true;
  }
  console.log("hi")
}

let checkedState = true;

//All comparisons of words should be done using regex&toLowerCase, but their values as sent should include punctuation

  return (
    <>

  <Container maxWidth="lg">
    {text.htmlString?.map((e) => {
      if (e.startsWith("p-lan1"))
      {
        return <p class="lan1"></p>
      }
      else if (e.startsWith("http"))
      {
        return <><br/><img src = {e} class="" style={{width: "75%", height:"50%", margin: "auto", display:"block"}} class="center x-illo"/><br/></>
      }
      else 
        return(
        <><> </>

        <label id={e.id} htmlFor={e} onClick={() => handleClickUpdateUserWords()} style={ userWords?.find(w => w.id === e.id) ? {color: "green"} : {color: "red"}} style={{ fontSize: 30 }}>
        {`${e}`}</label>

        {/* <input class={`wordCheckbox${e.id}`} style={{display: "none"}} onChange="null" id={e.id} type="checkbox" 
        defaultChecked={userWords?.find(w => w.id === e.id) ? "checked" : ""} name={e}></input> */}
        </>

      )})}
  </Container>
</>
  );
}

// `wordCheckbox${e.id}`=== "checked"