//External Imports
import React from "react";
import { Link } from "react-router-dom";

//Local Imports
import { SearchBar } from "../../components/SearchBar";
import { userInfoStoreObj } from "../../store/userInfoStore";

//Static Imports
import postIcon from "../../assets/img/PostIcon_04.png";
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
            <br />
            <br />
            <div className="LoadButton"><img className="LoadButton" alt="PostIcon" src={postIcon} /></div>
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

export { SearchScreen }