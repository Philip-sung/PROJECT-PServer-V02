//External Imports
import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
import { observer } from "mobx-react-lite";

//Local Imports
import { SearchBar } from "../../components/SearchBar";
import { userInfoStoreObj } from "../../store/userInfoStore";
import { Displayer, DisplayerContainer } from "../../components/Displayer";
import { postStoreObj } from "../../store/postStore";

//Static Imports
import postIcon from "../../assets/img/PostIcon.png";
import FetchIcon from "../../assets/img/FetchIcon_Combined.png";
import "./index.css";

//Imports for Tests
import TestImg from "../../assets/img/test.jpg"

function SearchScreen() {
    
    return (
        <div className="SearchScreen">
            <SearchBar />
            <DisplayerContainer>
                <DisplayerMap store={postStoreObj} />
            </DisplayerContainer>
            <GetAllPosts />
            <ConditionalLink />
        </div>
    )
}

function ConditionalLink(props) {
    let test = 'post';
    let onClickFunction = function(){};
    if(userInfoStoreObj.logOn === false){
        onClickFunction = function(){
            alert('Only Authorized Memebers can write posts.')
        }
        test = '/'
    }
    else if(userInfoStoreObj.logOn === true){
        onClickFunction = function(){
        }
        test = 'post'
    }
    return(<Link to={test} onClick={onClickFunction} ><img className="PostButton" alt="PostIcon" src={postIcon} /></Link>)
}


function GetAllPostsQuery() {
    return(
        gql`
        query GetPosts {
            getAllPosts {
                _id
                postTitle
                postDate
                postWriter
            }
        }
    `)
}

function GetAllPosts() {
    const {loading, error, data} = useQuery(GetAllPostsQuery());
    if(loading){
    }
    if(error){
        console.log(error.message);
    }

    return(
        <button className="LoadButton" onClick={
            () => {
            postStoreObj.ClearPostStack();
            postStoreObj.PushPostStack(data?.getAllPosts); 
            }
        }>
                <img className="LoadButtonImg" alt="PostIcon" src={FetchIcon}  />
        </button>
    )
}

const DisplayerMap = observer(({store}) => {
    const loadedData = store.loadedPosts;
    return(
        loadedData.slice().reverse().map(({_id, postTitle, postDate, postWriter}) => (
            <Displayer key={_id} name={`${postDate}\n${postWriter}`} img={TestImg} imgTxt={postTitle} />
        ))
    )
});

export { SearchScreen }