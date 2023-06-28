import React from "react"
import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor"
import { Link, useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import "./index.css"
import backIcon from "../../assets/img/BackArrowIcon.png"
import postIcon from "../../assets/img/PostIcon_04.png"
import { userInfoStoreObj } from "../../store/userInfoStore";

function PostScreen (){
    const navigate = useNavigate();
     useEffect(() => {
         if(userInfoStoreObj.logOn === false){
             navigate('/');
             alert('Only Authorized Memebers can write posts.');
         }
     })

    const [mdText,SetMDTest] = useState("");
    const [title, SetTitle] = useState("");

    
    return (
        <div className="PostScreen">
            <div className="Header">
                <div className="ButtonContainer"><Link to={"/"}><img className="Icon" src={backIcon} alt="Back"/></Link></div>
                <input className="Title" type="text" placeholder="Post Title" value={title} onChange={(e)=>{SetTitle(e.target.value)}}></input>
                <PostButton title={title} content={mdText} />
            </div>
            <div className="Board" data-color-mode="dark">
                <MDEditor height="100%" value={mdText} onChange={SetMDTest} />
            </div>
            {title}<br/>
            {mdText}<br/>
        </div>
    )
}

function PostQuery(title, content){
    const writer = userInfoStoreObj.getUserID();
    const contentString = encodeURI(content);
    return(gql`
            mutation CreatePost{
                createPost(
                    postTitle: "${title}",
                    postContent: "${contentString}"
                    postDate: "${new Date()}",
                    postWriter: "${writer}"
                ) {
                    postTitle
                    postContent
                    postDate
                    postWriter
                }
            }
        `
    )
}

function PostButton(props){
    const navigate = useNavigate();
    const [addPost, {loading, error}] = useMutation(PostQuery(props.title, props.content));

    if(loading){
    }
    if(error){
        console.log(error.message);
    }

    return (
        <button className="ButtonContainer">
            <img className="Icon" src={postIcon} alt="Post" onClick={() => {
                addPost();
                alert('Posted');
                navigate('/');
                }} />
        </button>
        )
}

export { PostScreen }