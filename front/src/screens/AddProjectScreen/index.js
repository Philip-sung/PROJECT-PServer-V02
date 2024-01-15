//External Imports
import React from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Local Imports
import { TransitionObject } from "../../components/TransitionObj";
import { userInfoStoreObj } from "../../store/userInfoStore";

//Static Imports
import "./index.css";

function AddProjectScreen() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [member, setMember] = useState("");
    const [reference, setReference] = useState("");

    return(
        <div className="AddProjectScreen">
            <TransitionObject>
                <p style={{color:"#fff", fontSize:50, fontWeight:700, fontFamily:"Consolas", marginBottom: "5vh", marginLeft: "8vw", marginRight: "8vw"}}>New Ideas are always welcome.</p>
                <input id="title" className="AddProjectInput" type="text" placeholder="Project Title" value={title} onChange={(e)=>{setTitle(e.target.value)}} onKeyDown={(e) => {if(e.keyCode === 13){document.getElementById("description").focus()}}} />
                <input id="description" className="AddProjectInput" type="text" placeholder="Brief Description" value={description} onChange={(e)=>{setDescription(e.target.value)}}  onKeyDown={(e) => {if(e.keyCode === 13){document.getElementById("member").focus()}}} />
                <input id="member"className="AddProjectInput" type="text" placeholder="Member Recommendation(e.g. Kim, Lee, Choi)" value={member} onChange={(e)=>{setMember(e.target.value)}}  onKeyDown={(e) => {if(e.keyCode === 13){document.getElementById("reference").focus()}}} />
                <input id="reference" className="AddProjectInput" type="text" placeholder="Reference" value={reference} onChange={(e)=>{setReference(e.target.value)}}  onKeyDown={(e) => {if(e.keyCode === 13){document.getElementById("submit").click()}}} />
                <Submit title={title} description={description} member={member} reference={reference} />
            </TransitionObject>
        </div>
    )
}
const getProjectbyTitleQuery =
    gql`
        query getProjectbyTitle($title: String) {
            getProjectbyTitle(title: $title) {
                title
            }
        }
    `

const getUsers =
    gql`
        query getUsers($userID: [String]) {
            getUsers(userID: $userID) {
                userID
            }
        }
    `
function addProjectQuery(title, members, description, reference){
    const designer = userInfoStoreObj.getUserID();
    const curTime = new Date();
    const curYear = curTime.getFullYear().toString();
    const curMonth = (curTime.getMonth() + 1).toString().padStart(2,'0');
    const curDate = curTime.getDate().toString().padStart(2,'0');
    const Days = ['Sn','Mn','Tu','Wd','Th','Fr','St'];
    const curDay = Days[curTime.getDay()].toString();
    const curHour = curTime.getHours().toString().padStart(2,'0');
    const curMinute = curTime.getMinutes().toString().padStart(2,'0');
    let memberString = "";
    for(let i = 0; i < members.length; i++){
        memberString = memberString + `"${members[i]}"`;
        if(i !== members.length - 1){
            memberString = memberString + ",";
        }
    }
    return(gql`
            mutation CreateProject{
                createProject(
                    title: "${title}",
                    designer: "${designer}",
                    status: "inProgress",
                    funding: 0,
                    started: "${curYear}.${curMonth}.${curDate} ${curDay} ${curHour}:${curMinute}",
                    completed: "",
                    progress: 0,
                    privilege: "Public",
                    link: "",
                    member: [${memberString}],
                    tech: [],
                    thumbnail: "Public",
                    description: "${description}",
                    reference: "${reference}",
                    location: "local"
                ) {
                    title
                    status
                    progress
                    member
                }
            }
        `
    )
}

function SplitMemberString( memberStr ) {
    const memberArr = memberStr?.split(',');
    for(let i = 0; i < memberArr.length; i++){
        memberArr[i] = memberArr[i].trim();
    }

    return memberArr;
}

function Submit( props ){
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [warningString, setWarningString] = useState("");
    const [checkTitle] = useLazyQuery(getProjectbyTitleQuery, {
        variables: {
            title: projectName
        },
        fetchPolicy:'network-only',
        onCompleted: (data) => {
            setWarningString("");
            if(data.getProjectbyTitle !== null || projectName === "Public"){
                setWarningString(`Project "${projectName}" already exists.`)
            }
            else if(data.getProjectbyTitle === null){
                checkUsers();
            }
        }
    })
    const [checkUsers] = useLazyQuery(getUsers ,{
        variables: {
            userID: members
        },
        fetchPolicy:'network-only',
        onCompleted: (data) => {
            if(warningString === ""){
                console.log(members);
                const confirmedUser = [userInfoStoreObj.curUser.id];
                for(let i = 0; i < data?.getUsers.length; i++){
                    confirmedUser.push(data?.getUsers[i].userID)
                }
                let difference = members.filter(member => !confirmedUser.includes(member));
                if(difference.length > 0){
                    let warning = "";
                    for(let i = 0; i < difference.length; i++){
                        warning = warning + difference[i];
                        if(i !== difference.length - 1){
                            warning = warning + ", ";
                        }
                    }
                    warning = warning + " is not member of PhilipSung";
                    setWarningString(warning);
                }
                else if(difference.length === 0){
                    addProject();
                    alert("Project Registered Successfully")
                    navigate('/');
                }
            }
        }
    });

    const [addProject] = useMutation(addProjectQuery(props.title, members, props.description, props.reference))

    return (
        <div className="ProjectProposalSubmit">
            <div className="Warning">{warningString}</div>
            <button id="submit" className="AddProjectButton"
                onClick={() => {
                    if(userInfoStoreObj.loginState === false){
                        alert("Only Member can propose Project")
                    }
                    else if (userInfoStoreObj.loginState === true){
                        let newMembers;
                        if(props.member === ""){
                            newMembers = [userInfoStoreObj.curUser.id];
                        }
                        else{
                            newMembers = SplitMemberString(props.member);
                        }
                        setMembers(newMembers);
                        setProjectName(props.title);
                        checkTitle();
                    }
                }}>SUBMIT</button>
        </div>
    );
}

export { AddProjectScreen };