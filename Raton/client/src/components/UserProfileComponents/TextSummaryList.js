import * as React from 'react';
import { useEffect, useState } from "react";
import { getUserReadTexts } from "../../modules/textManager";
import { Row, Container } from 'reactstrap';
import { TextSummary } from './TextSummary';

export const TextSummaryList = ({user}) => {

const [texts, setTexts] = useState([]);

useEffect(() => {
  getUserReadTexts()
  .then(texts => setTexts(texts))
},[])

return(
    <div style={{padding: "2em", pargin: "2em"}}>
    <h1>Stories You've Read</h1>
        <Row>
        {texts.map(t => <TextSummary user={user} text = {t} key = {t.id}/>)}
        </Row>
    </div>
)}
