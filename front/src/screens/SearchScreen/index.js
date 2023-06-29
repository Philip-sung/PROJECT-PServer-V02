//External Imports
import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

//Local Imports
import { SearchBar } from "../../components/SearchBar";
import { userInfoStoreObj } from "../../store/userInfoStore";

//Static Imports
import postIcon from "../../assets/img/PostIcon.png";
import FetchIcon from "../../assets/img/FetchIcon_Combined.png";
import "./index.css";

function SearchScreen() {

    
    return (
        <div className="SearchScreen">
            <SearchBar />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <button className="LoadButton"><img className="LoadButtonImg" alt="PostIcon" src={FetchIcon} onClick={() => {GetAllPosts()}} /></button>
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
    if(data){
        console.log(data);
    }
}


export { SearchScreen }