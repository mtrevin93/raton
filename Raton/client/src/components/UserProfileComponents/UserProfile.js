import * as React from 'react';
import { Row, Container } from 'reactstrap';
import { Bio } from './Bio';
import { TextSummaryList } from './TextSummaryList';

export const UserProfile = ({user}) => {

return(
    <div style={{padding: "2em", pargin: "2em"}}>
    <h1>{user.username}'s Profile</h1>
        <Row>
            <Bio user = {user} key = {user.id}/>
        </Row>
        <Row>
            <TextSummaryList user = {user} key = {user.id}/>
        </Row>
    </div>
)}
