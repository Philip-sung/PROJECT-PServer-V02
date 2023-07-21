//External Imports
import React from "react";
import MDEditor from "@uiw/react-md-editor"
import { useQuery, gql } from '@apollo/client';

//Static Imports
import "./index.css";

function PostReadScreen(props) {
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
                project
            }
        }
    `)
}

function PostbyID(props) {
    const {loading, error, data} = useQuery(GetPostbyIDQuery(props.postID));
    if(loading){
    }
    if(error){
        console.log(error.message);
    }
    
    return(
        <div className="PostReadScreen">
            <div className="PostHeader">
                <div className="PostHeaderTitle">{data?.getPostbyID.postTitle}</div>
            </div>
            <div className="PostData">
                <div className="PostHeaderDate">{data?.getPostbyID.postDate}</div>
                <div className="PostHeaderWriter">{data?.getPostbyID.postWriter}</div>
            </div>
            <div className="PostReaderWindow" data-color-mode="dark">
                <MDEditor.Markdown className="mdReader" source={decodeURI(data?.getPostbyID.postContent)} />
            </div>
        </div>
    )
}

export { PostReadScreen };