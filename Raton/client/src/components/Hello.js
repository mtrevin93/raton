import React from "react";
import { Container } from "@mui/material";

export default function Hello() {

const triggerClick = () => {
  debugger
  console.log("hi")
}

const htmlTest = ['<p class="lan1>', 
"https://uploads-ssl.webflow.com/581a8b6ad92743753594a969/5bce906d357ce26602b4f616_chicken2-sp.jpg",
"Está leyendo las noticias. Ve un artículo aterrador con un título aterrador. Dice: ¡EL CIELO SE ESTÁ CAYENDO!<br/>",
'</p>']

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
        return <><label htmlFor={w} style={{ fontSize: 30 }}>{w}</label><input type="checkbox" name={w} onClick={() => triggerClick()}></input></>
      })}
  
  </Container>
</>
  );
}
