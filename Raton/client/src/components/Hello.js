import React from "react";
import { Container } from "@mui/material";

export default function Hello() {

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

const htmlTest = ['<p class="lan1>', 
"https://uploads-ssl.webflow.com/581a8b6ad92743753594a969/5bce906d357ce26602b4f616_chicken2-sp.jpg",
"Está ", "leyendo ", "las ", "noticias ", "Ve ", "un ", "artículo ", "aterrador ", "con ", "un ", "título ", "aterrador ", "Dice ", "EL ", "CIELO ", "SE ", "ESTÁ ", "CAYENDO ",
'</p>', '<p class="lan1>', 'esta ', 'blah ', 'blah ']

const words = []

  return (
    <>

  <Container maxWidth="xl">
    {htmlTest.map((e) => {
      if (e.startsWith("<p"))
      {
        return <p class="lan1"></p>
      }
      else if (e.startsWith("https:"))
      {
        return <><img src = {e} class="" style={{width: "50%", height:"50%"}} class="x-illo"/><br/></>
      }
      else 
      {
        (words.push(e))
      }
    })}
      {words?.map((w) => {
        return <><label htmlFor={w} onClick={() => triggerClick()} style={{ fontSize: 30 }}>{w}</label><input style={{display: "none"}} type="checkbox" checked={checkedState ===true? "checked" : false} name={w}></input></>
      })}
  
  </Container>
</>
  );
}
