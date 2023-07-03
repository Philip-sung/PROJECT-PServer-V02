//External Imports
import React from "react";
import { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";

//Local Imports
import { TransitionObject } from "../TransitionObj";
import { postStoreObj } from "../../store/postStore";

//Static Imports
import "./index.css"
import image1 from "../../assets/img/SearchIcon.png"

function SearchBar () {

    const [search, setSearch] = useState('');

    return(
        <TransitionObject>
            <div className="SearchBarForm">
                <input className="SearchBar" placeholder="Search" value={search} onChange={(e) => {setSearch(e.target.value)}} onKeyDown={(e) => {if(e.keyCode === 13){document.getElementById('SearchButton').click()}}}></input>
                <GetPostsbyTitleButton keyword={search} />
            </div>
        </TransitionObject>
    )
}

function GetPostsbyTitleQuery(postTitle) {
    return(
        gql`
        query GetPostsbyTitle {
            getPostsbyTitle(postTitle:"${postTitle}") {
                _id
                postTitle
                postDate
                postWriter
            }
        }
    `)
}

function GetPostsbyTitleButton(props){
    const [postTitle, setPostTitle] = useState('');
    const [getPostsbyTitle, {loading, error}] = useLazyQuery(GetPostsbyTitleQuery(postTitle), {
        onCompleted: (data) =>{
            postStoreObj.ClearPostStack();
            postStoreObj.PushPostStack(data?.getPostsbyTitle);
        },
        fetchPolicy: 'network-only'
    });
    if(loading){
    }
    if(error){
        console.log(error.message);
    }
    return(
        <button id="SearchButton" className="Search" onClick={
            () => {
                setPostTitle(props.keyword);
                getPostsbyTitle();
            }
        }>
                <img className="SearchImg" src={image1} alt="SearchImg" />
        </button>
    )
}

export { SearchBar };