//External Imports
import React from "react";
import { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";

//Local Imports
import { TransitionObject } from "../TransitionObj";
import { postStoreObj } from "../../store/postStore";
import { searchStoreObj } from "../../store/SearchStore";

//Static Imports
import "./index.css"
import image1 from "../../assets/img/SearchIcon.png"

function SearchBar () {

    const [keyword, setKeyword] = useState('');

    return(
        <TransitionObject>
            <div className="SearchBarForm">
                <input className="SearchBar" placeholder="Search" value={keyword} onChange={(e) => {setKeyword(e.target.value)}} onKeyDown={(e) => {if(e.keyCode === 13){document.getElementById('SearchButton').click()}}}></input>
                <GetPostsbyTitleButton keyword={keyword} />
            </div>
        </TransitionObject>
    )
}

const GetPostsbyTitleQuery = gql`
    query GetPostsbyTitlePaginated($postTitle: String!, $offset: Int!, $limit: Int!) {
        getPostsbyTitlePaginated(postTitle: $postTitle, offset: $offset, limit: $limit) {
            _id
            postTitle
            postDate
            postWriter
        }
    }
`

function GetPostsbyTitleButton(props){
    const [getPostsbyTitle, {loading, error}] = useLazyQuery(GetPostsbyTitleQuery, {
        variables: {
            postTitle: searchStoreObj.curKeyword,
            offset: searchStoreObj.offset,
            limit: searchStoreObj.limit
        },
        onCompleted: (data) =>{
            postStoreObj.ClearPostStack();
            postStoreObj.PushPostStack(data?.getPostsbyTitlePaginated);
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
                searchStoreObj.SetKeyword(props.keyword);
                getPostsbyTitle();
                searchStoreObj.InitializeOffsetLimit();
            }
        }>
                <img className="SearchImg" src={image1} alt="SearchImg" />
        </button>
    )
}

export { SearchBar };
