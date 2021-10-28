import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {Container, Input} from "reactstrap"
import { getTextById, updateText, addText } from "../../modules/textManager";

export const TextForm = () => {
    
    const history = useHistory();

    const [ text, setText ] = useState({
        title : "",
        description : "",
        headerImg : "",
        content : "",
    })

    const { textId } = useParams();

    useEffect(() => {
        console.log(textId)
        if(textId?.id && text.title ==="")
        {
            getTextById(textId)
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

return(
    <Container>
        <div classtitle="TextForm">
            <h3>Add a New Text</h3>
            <div classtitle="container-5">
            <div classtitle ="form-group">

                    <label for="title">Title</label>
                    <Input type="textarea" class="form-control" id="title" placeholder ="title" value={text.title} onChange={handleInput} required/>

                    <label for="description">Description</label>
                    <Input type="textarea-lg" class="form-control" id="content" placeholder ="Description" value={text.description} onChange={handleInput} required/>

                    <label for="imageLocation">Header Image</label>
                    <Input type="textarea" class="form-control" id="imageLocation" placeholder ="URL" value={text.headerImg} onChange={handleInput} required/>

                    <label for="title">Web Address</label>
                    <Input type="textarea" class="form-control" id="content" placeholder ="Address" value={text.content} onChange={handleInput} required/>
            </div>
               {textId?.id? 
                <div>
                    <button type="submit" class="btn btn-primary mr-3" onClick={() => {
                        handleClickUpdateText()
                    }}>Update</button>
                </div>
                : 
                <div>
                <button type="submit" class="btn btn-primary mr-3" onClick={() => {
                    handleClickAddText()
                }}>Create</button>
                </div>
                }
            </div>
        </div>
    </Container>
)}
