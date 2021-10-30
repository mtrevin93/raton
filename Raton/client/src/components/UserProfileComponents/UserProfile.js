import * as React from 'react';
import { Row, Col, CardColumns } from 'reactstrap';
import { TextSummaryList } from './TextSummaryList';
import { VocabList } from './VocabList';

export const UserProfile = ({user}) => {

return(
    <div style={{padding: "2em", pargin: "2em"}}>
    <h1>{user.username}'s Profile</h1>
    <CardColumns style={{display: "flex"}}>
    <VocabList/>    
    <Col>
    </Col>
    </CardColumns>
        <Row>
            <TextSummaryList user = {user} key = {user.id}/>
        </Row>

    </div>
)}
