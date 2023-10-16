//External Imports
import React from "react";
import { useState } from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";

//Local Imports
import { userInfoStoreObj } from "../../store/userInfoStore";

//Static Imports
import "./index.css"
import messengerIcon from "../../assets/img/MessengerIcon.png"
import { timeStoreObj } from "../../store/timeStore";

function MessengerBar () {

    const [content, setContent] = useState('');

    return(
        <div className="MessengerBarForm">
            <input className="MessengerBar" placeholder="UserName : Message Content" value={content} onChange={(e) => {setContent(e.target.value)}} onKeyDown={(e) => {if(e.keyCode === 13){document.getElementById('MessengerButton').click()}}}></input>
            <SendMessengerButton content={content} />
        </div>
    )
}

function GetReceiverAndContent( str ) {
    const divString = str?.split(':');
    const messageInfo = {
        receiver : "",
        content: "",
    }
    if(divString.length >= 2){
        messageInfo.receiver = divString[0].trim();
        messageInfo.content = str.substring(divString[0].length + 1).trim();
    }

    return messageInfo;
}

const getUserbyIDQuery = gql`
    query GetUserbyID($userID : String){
        getUser(userID : $userID){
            userID
        }
    }
`

const sendMessageQuery = gql`
    mutation SendMessage($project: String, $title: String, $from: String, $to: String, $content: String, $time: String){
        createNotice(project: $project, title: $title, from: $from, to: $to, content: $content, time: $time){
            title
            content
        }
    }
`

function SendMessengerButton(props){
    const messageObject = GetReceiverAndContent(props.content);
    const [messageObj, setMessageObj] = useState({})
    
    const [createNotice] = useMutation(sendMessageQuery,{
        variables: {
            project: "Messenger",
            title: `Message From ${userInfoStoreObj.curUser.id}`,
            from: userInfoStoreObj.curUser.id,
            to: messageObj.receiver,
            content: messageObj.content,
            time: timeStoreObj.GetCurrentTimeString()
        }
    })

    const [checkReceiver] = useLazyQuery(getUserbyIDQuery ,{
        variables: {
            userID: messageObj.receiver
        },
        fetchPolicy:'network-only',
        onCompleted: (data) => {
            console.log(messageObj);
            const receiverUser = data?.getUser?.userID;
            console.log(receiverUser);
            let warning = "";
            if (receiverUser === null || receiverUser === undefined){
                warning = `Invalid Receiver : ${messageObj?.receiver}`
                alert(warning);
            }
            else if(receiverUser !== null && receiverUser !== undefined){
                createNotice();
                alert(`Message delivered to ${messageObj?.receiver}.`)
            }
        }
    });


    return(
        <button id="MessengerButton" className="Messenger" onClick={
            () => {
                setMessageObj(messageObject);
                checkReceiver();
            }
        }>
                <img className="SearchImg" src={messengerIcon} alt="messengerIcon" />
        </button>
    )
}

export { MessengerBar };
