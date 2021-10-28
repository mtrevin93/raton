import * as React from 'react';
import { useEffect, useState } from "react";
import { getTexts } from "../../modules/textManager";
import { Text } from './Text';
import { Row, Container } from 'reactstrap';

export const TextList = ({user}) => {

const [texts, setTexts] = useState([]);

useEffect(() => {
  getTexts()
  .then(texts => setTexts(texts))
},[])

return(
    <div style={{padding: "2em", pargin: "2em"}}>
    <h1>All Stories</h1>
        <Row>
        {texts.map(t => <Text setTexts={setTexts} user={user} text = {t} key = {t.id}/>)}
        </Row>
    </div>
)}
