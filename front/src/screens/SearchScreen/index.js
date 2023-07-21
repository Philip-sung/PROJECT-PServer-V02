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

function SearchScreen() {

    return (
        <div className="SearchScreen">
            <SearchBar />
            <DisplayerContainer>
                <DisplayerPostMap store={postStoreObj} />
            </DisplayerContainer>
            <GetAllPostsButton />
            <ConditionalLink />
        </div>
    )
}

const checkIfMemberOfProjectQuery = gql`
    query CheckIfMemeberOfProject($userID: String){
        getUser(userID: $userID){
            project
        }
    }
`

const DisplayerPostMap = observer(({store}) => {
    
    const loadedData = store.loadedPosts;

    const [CheckUsersProjects] = useLazyQuery(checkIfMemberOfProjectQuery,{
        variables: { userID: userInfoStoreObj.curUser.id },
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            return data?.getUser?.project;
        }
    })
    
    return(
        loadedData.map(({_id, postTitle, postDate, postWriter, project}) => (
            <Displayer 
                key={_id}
                name={`${postDate}\n${postWriter}`}
                img={project}
                imgTxt={postTitle}
                action={"UseFunction"}
                function={
                    async () => {
                        let authorized = false;
                        const result = await CheckUsersProjects();
                        const projects = result?.data?.getUser?.project || ["Public"];
                        for(let i = 0; i < projects.length; i++){
                            if(projects[i] === project || postWriter === userInfoStoreObj.curUser.id){
                                screenStoreObj.GetNewScreen("PostRead",_id)
                                authorized = true;
                            }
                        }
                        if(!authorized){
                            alert(`[${project}] Project Member Only`)
                        }
                    }
                } />
        ))
    )
});

function ConditionalLink(props) {
    let redirection = 'post';
    let onClickFunction = function(){};
    if(userInfoStoreObj.getLoginState() === false){
        onClickFunction = function(){
            alert('Only Authorized Memebers can write posts.')
        }
        redirection = '/'
    }
    else if(userInfoStoreObj.getLoginState() === true){
        onClickFunction = function(){
        }
        redirection = 'post'
    }
    return(<Link to={redirection} onClick={onClickFunction} ><img className="PostButton" alt="PostIcon" src={postIcon} /></Link>)
}

const GetPostsbyTitleQuery = gql`
    query GetPostsbyTitlePaginated($postTitle: String!, $offset: Int!, $limit: Int!) {
        getPostsbyTitlePaginated(postTitle: $postTitle, offset: $offset, limit: $limit) {
            _id
            postTitle
            postDate
            postWriter
            project
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