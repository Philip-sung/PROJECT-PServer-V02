//External Imports
import React from "react";
import { Link } from "react-router-dom";
import { useLazyQuery, gql } from '@apollo/client';
import { observer } from "mobx-react-lite";

//Local Imports
import { SearchBar } from "../../components/SearchBar";
import { userInfoStoreObj } from "../../store/userInfoStore";
import { Displayer, DisplayerContainer } from "../../components/Displayer";
import { postStoreObj } from "../../store/postStore";
import { screenStoreObj } from "../../store/screenStore";
import { searchStoreObj } from "../../store/SearchStore";

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
            <GetAllPostsButton />
            <ConditionalLink />
        </div>
    )
}

const DisplayerMap = observer(({store}) => {
    const loadedData = store.loadedPosts;
    return(
        loadedData.map(({_id, postTitle, postDate, postWriter}) => (
            <Displayer key={_id} name={`${postDate}\n${postWriter}`} img={TestImg} imgTxt={postTitle} action={"useFunction"} function={() => {screenStoreObj.GetNewScreen("PostRead",_id)}} />
        ))
    )
});

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

function GetAllPostsButton() {
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
        <button className="LoadButton" onClick={
            () => {
                searchStoreObj.ExtendLimit();
                getPostsbyTitle();
            }
        }>
                <img className="LoadButtonImg" alt="PostIcon" src={FetchIcon}  />
        </button>
    )
}

export { SearchScreen }