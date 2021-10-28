import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {Container, Input} from "reactstrap"
import { getTextByIdNoWords, updateText, addText } from "../../modules/textManager";
import { Row } from "reactstrap";

export const TextForm = () => {
    
    const history = useHistory();

    const [ text, setText ] = useState({
        title : "",
        description : "",
        headerImg : "",
        address : "",
        id : null
    })

    const { id } = useParams();

    useEffect(() => {
        if(id && text.title ==="")
        {
            getTextByIdNoWords(id)
            .then(text => setText(text));
        }
    },[])
  
    const handleInput = (event) => {
        const newText = {...text};
        newText[event.target.id] = event.target.value;
        setText(newText);
    }

    const handleClickAddText = () => {    
        addText(text)
        .then(history.push("/text"))
    }

    const handleClickUpdateText = () => {
        updateText(text)
        .then(history.push("/text"))
    }

    const handleClickNavigate = () => {
        history.push("/text")
    }

return(
    <Container>  
        <div classtitle="TextForm">
            <h3>Add a New Text</h3>
            <div classtitle="container-5">
            <div classtitle ="form-group">

                    <label for="title">Title</label>
                    <Input type="text" class="form-control" id="title" placeholder ="Title" value={text.title} onChange={handleInput} required/>

                    <label for="description">Description</label>
                    <Input type="textarea" class="form-control" id="description" placeholder ="Description" value={text.description} onChange={handleInput} required/>

                    <label for="imageLocation">Header Image</label>
                    <Input type="text" class="form-control" id="headerImg" placeholder ="URL" value={text.headerImg} onChange={handleInput} required/>
                {id?
                    <>
                    <Input type="hidden" class="form-control" id="address" placeholder ="Address" value={text.address} onChange={handleInput} required/>
                </> 
                 :
                <>
                    <label for="title">Web Address</label>
                    <Input type="text" class="form-control" id="address" placeholder ="Address" value={text.address} onChange={handleInput} required/>
                </> }
            </div>
            <Row>
               {id? 
                <div>
                    <button type="submit" class="btn btn-primary ml-3 my-2" onClick={() => {
                        handleClickUpdateText()
                    }}>Update</button>
                </div>
                : 
                <div>
                <button type="submit" class="btn btn-primary ml-3 my-2" onClick={() => {
                    handleClickAddText()
                }}>Create</button>
                </div>
                }
                <button type="submit" class="btn btn-primary ml-3 my-2" onClick={() => {
                    handleClickNavigate()
                }}>Cancel</button>
            </Row>
            </div>
        </div>
    </Container>
)}
