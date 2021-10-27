import React, { useState, useEffect } from "react";
import { addPost } from "../modules/postManager";
import { useHistory, useParams } from "react-router-dom";
import {Container, Input} from "reactstrap"
import { getAllCategories } from "../modules/categoryManager";
import { getPostById, updatePost } from "../modules/postManager";

const PostForm = () => {
    
    const history = useHistory();

    const [categories, setCategories] = useState([]);

    const [ post, setPost ] = useState({
        title : "",
        content : "",
        imageLocation : "",
        publishDateTime : "",
        categoryId : "",
    })

    const postId = useParams();

    if(postId.id && post.title ==="")
    {
        getPostById(postId.id)
        .then(post => setPost(post));
    }
  
    const getCategories = () => {
        getAllCategories().then(categories => setCategories(categories));
    };
      
    useEffect(() => {
        getCategories();
    }, []);
      

    const handleInput = (event) => {
        const newPost = {...post};
        newPost[event.target.id] = event.target.value;
        setPost(newPost);
    }

    const handleClickCreatePost = () => {    
        addPost(post)
        .then(history.push("/post"))
    }

    const handleClickUpdatePost = () => {
        updatePost(post)
        .then(history.push("/post"))
    }

return(
    <Container>
        <div className="postForm">
            <h3>Add a Post</h3>
            <div className="container-5">
            <div className ="form-group">

                    <label for="name">Name</label>
                    <Input type="name" class="form-control" id="title" placeholder ="Title" value={post.title} onChange={handleInput} required/>

                    <label for="content">Content</label>
                    <Input type="textarea-lg" class="form-control" id="content" placeholder ="Content" value={post.content} onChange={handleInput} required/>

                    <label for="imageLocation">Image URL</label>
                    <Input type="url" class="form-control" id="imageLocation" placeholder ="Image URL" value={post.imageLocation} onChange={handleInput} required/>

                    <label for="name">Publish Date</label>
                    <Input type="datetime-local" class="form-control" id="publishDateTime" placeholder ="title" value={post.publishDateTime} onChange={handleInput} required/>

                    <label for="category">Category</label>
                    <Input type="select" name="select" value={post.categoryId} id="categoryId" onChange={handleInput}>
                        <option value={null}>Select a Category</option>
                    {categories.map(c => {
                        return <option value={c.id}>{c.name}</option>
                    })}
                    </Input>
            </div>
               {postId.id? 
                <div>
                    <button type="submit" class="btn btn-primary mr-3" onClick={event => {
                        handleClickUpdatePost()
                    }}>Update</button>
                </div>
                : 
                <div>
                <button type="submit" class="btn btn-primary mr-3" onClick={event => {
                    handleClickCreatePost()
                }}>Create</button>
                </div>
                }
            </div>
        </div>
    </Container>
)}

export default PostForm;