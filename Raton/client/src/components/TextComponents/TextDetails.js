import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import { Container } from "@mui/material";
import { getTextById } from "../../modules/textManager";

export default function Hello() {

  const history = useHistory();

  const [text, setText] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getTextById(id)
    .then(text => setText(text))
  },[])

const triggerClick = () => {
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

const htmlTest = ['<p class="lan1>', 
"https://uploads-ssl.webflow.com/581a8b6ad92743753594a969/5bce906d357ce26602b4f616_chicken2-sp.jpg",
"Está ", "leyendo ", "las ", "noticias ", "Ve ", "un ", "artículo ", "aterrador ", "con ", "un ", "título ", "aterrador ", "Dice ", "EL ", "CIELO ", "SE ", "ESTÁ ", "CAYENDO ",
'</p>', '<p class="lan1>', 'esta ', 'blah ', 'blah ']

  return (
    <>

  <Container maxWidth="xl">
    {text.htmlString?.map((e) => {
      if (e.startsWith("p-lan1"))
      {
        return <p class="lan1"></p>
      }
      else if (e.startsWith("http"))
      {
        return <><br/><img src = {e} class="" style={{width: "50%", height:"50%"}} class="x-illo"/><br/></>
      }
      else 
        return <><label htmlFor={e} onClick={() => triggerClick()} style={{ fontSize: 30 }}>{` ${e}`}</label><input style={{display: "none"}} type="checkbox" checked={checkedState ===true? "checked" : false} name={e}></input></>
      })}
  </Container>
</>
  );
}
