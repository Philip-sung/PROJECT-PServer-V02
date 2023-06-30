//External Imports
import React from "react";
import MDEditor from "@uiw/react-md-editor"
import { useQuery, gql } from '@apollo/client';

//Static Imports
import "./index.css";

function PostReadScreen(props) {
    console.log(props.postID)
    return (
        <PostbyID postID={props.postID} />
    )
}

function GetPostbyIDQuery(postIdString) {
    const postID = postIdString;

    return(
        gql`
        query GetPostbyID {
            getPostbyID(postID: "${postID}"){
                _id
                postTitle
                postContent
                postDate
                postWriter
            }
        }
    `)
}

function PostbyID(props) {
    const {loading, error, data} = useQuery(GetPostbyIDQuery(props.postID));
    console.log("HE")
    if(loading){
    }
    if(error){
        console.log(error.message);
    }
    
    return(
        <div className="PostReadScreen">
            <div className="PostHeader">
                <div><small style={{fontSize: 15}}>{data?.getPostbyID.postDate}</small></div>
                <div><strong>{data?.getPostbyID.postTitle}</strong></div>
                <div><small style={{fontSize: 15}}>{data?.getPostbyID.postWriter}</small></div>
            </div>
            <div className="PostReaderWindow" data-color-mode="dark">
                <MDEditor.Markdown className="mdReader" source={decodeURI(data?.getPostbyID.postContent)} />
            </div>
        </div>
    )
}

export { PostReadScreen };