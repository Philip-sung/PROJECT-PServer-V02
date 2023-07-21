//External Imports
import React from "react";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { gql, useMutation, useLazyQuery } from "@apollo/client";

//Local Imports
import { TimeBar } from "../TimeBar";
import { Displayer, DisplayerContainer } from "../../components/Displayer";
import { timeStoreObj } from "../../store/timeStore";
import { userInfoStoreObj } from "../../store/userInfoStore";

//Static Imports
import './index.css';

//Test Imports
import sampleImg from "../../assets/img/Sample.jpeg"

const Reservation = observer(({store}) => {

    const [projectName, SetProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [member, setMember] = useState("");

    if(store.isDateSelected === true && store.isEndTimeSelected === true && projectName !== ""){
        return(
            <div>
                <TimeBar />
                <div className="RScreen">
                    <br />
                    <small> SELECTED : {store.selectedStartTime.getFullYear()} . {store.selectedStartTime.getMonth() + 1} . {store.selectedStartTime.getDate()} &nbsp;&nbsp;
                    <strong>&#91; {store.selectedStartTime.getHours()}:00 ~ {store.selectedEndTime.getHours()}:00 &#93;</strong></small>
                    <br />
                    <br />
                    <DisplayerContainer>
                        <Displayer name="SampleProject" img={sampleImg} action={"UseFunction"} function={SetProjectName} parameter={"SampleProject1"} />
                        <Displayer name="SampleProject" img={sampleImg} action={"UseFunction"} function={SetProjectName} parameter={"SampleProject2"} />
                        <Displayer name="SampleProject" img={sampleImg} action={"UseFunction"} function={SetProjectName} parameter={"SampleProject3"} />
                        <Displayer name="SampleProject" img={sampleImg} action={"UseFunction"} function={SetProjectName} parameter={"SampleProject4"} />
                        <Displayer name="SampleProject" img={sampleImg} action={"UseFunction"} function={SetProjectName} parameter={"SampleProject5"} />
                    </DisplayerContainer>
                    <input id="description" className="ReservationInput" type="text" placeholder="Content Brief" value={description} onChange={(e)=>{setDescription(e.target.value)}}  onKeyDown={(e) => {if(e.keyCode === 13){document.getElementById("member").focus()}}} />
                    <input id="member"className="ReservationInput" type="text" placeholder="Receiving Member(ID)" value={member} onChange={(e)=>{setMember(e.target.value)}}  onKeyDown={(e) => {if(e.keyCode === 13){document.getElementById("submit").focus()}}} />
                    <CreateScheduleButton project={projectName} description={description} member={member} />
                </div>
            </div>
        )
    }
    else if(store.isDateSelected === true && store.isEndTimeSelected === true && projectName === ""){
        return(
            <div>
                <TimeBar />
                <div className="RScreen">
                    <br />
                    <small> SELECTED : {store.selectedStartTime.getFullYear()} . {store.selectedStartTime.getMonth() + 1} . {store.selectedStartTime.getDate()} &nbsp;&nbsp;
                    <strong>&#91; {store.selectedStartTime.getHours()}:00 ~ {store.selectedEndTime.getHours()}:00 &#93;</strong></small>
                    <br />
                    <br />
                    <DisplayerContainer>
                        <Displayer name="SampleProject" img={sampleImg} action={"UseFunction"} function={SetProjectName} parameter={"SampleProject1"} />
                        <Displayer name="SampleProject" img={sampleImg} action={"UseFunction"} function={SetProjectName} parameter={"SampleProject2"} />
                        <Displayer name="SampleProject" img={sampleImg} action={"UseFunction"} function={SetProjectName} parameter={"SampleProject3"} />
                        <Displayer name="SampleProject" img={sampleImg} action={"UseFunction"} function={SetProjectName} parameter={"SampleProject4"} />
                        <Displayer name="SampleProject" img={sampleImg} action={"UseFunction"} function={SetProjectName} parameter={"SampleProject5"} />
                    </DisplayerContainer>
                </div>
            </div>
        )
    }
    else if(store.isDateSelected === true && store.isEndTimeSelected === false){
        
        return(
            <div onClick={() => {SetProjectName("");}}>
                <TimeBar />
            </div>
        )
    }
    else if(store.isDateSelected === false){
        return(<div></div>)
    }
});

const createScheduleQuery = gql`
    mutation CreateSchedule($project: String, $createdTime:String, $startTime: String, $endTime: String, $proposer: String, $content: String, $member: [String]){
        createSchedule(
            project: $project,
            createdTime: $createdTime
            startTime: $startTime,
            endTime: $endTime
            proposer: $proposer,
            content: $content,
            member: $member
        ){
            project
            createdTime
            startTime
            endTime
            proposer
            content
            member
        }
    }
`


function SplitMemberString( memberStr ) {
    const memberArr = memberStr.split(',');
    for(let i = 0; i < memberArr.length; i++){
        memberArr[i] = memberArr[i].trim();
    }

    return memberArr;
}

const getUsers =gql`
    query getUsers($userID: [String]) {
        getUsers(userID: $userID) {
            userID
        }
    }
`

function CreateScheduleButton(props) {
    const navigate = useNavigate();

    const [members, setMembers] = useState([]);
    const [memberCheck, setMemberCheck] = useState("");
    const scheduleStart = timeStoreObj.selectedStartTime;
    const scheduleEnd = timeStoreObj.selectedEndTime;

    const dateString = `${scheduleStart.getFullYear().toString().padStart(2,'0')}.${(scheduleStart.getMonth() + 1).toString().padStart(2,'0')}.${scheduleStart.getDate().toString().padStart(2,'0')}`;
    const startTimeString = `${scheduleStart.getHours().toString().padStart(2,'0')}:${scheduleStart.getMinutes().toString().padStart(2,'0')}`;
    const endTimeString = `${scheduleEnd.getHours().toString().padStart(2,'0')}:${scheduleEnd.getMinutes().toString().padStart(2,'0')}`;
    
    const [CreateSchedule] = useMutation(createScheduleQuery,{
        variables: {
            project: props.project,
            createdTime: timeStoreObj.GetCurrentTimeString(),
            startTime: `${dateString} ${startTimeString}`,
            endTime: `${dateString} ${endTimeString}`,
            proposer: userInfoStoreObj.curUser.id,
            content: props.description,
            member: SplitMemberString(props.member)
        }
    })

    const [checkUsers] = useLazyQuery(getUsers ,{
        variables: {
            userID: members
        },
        fetchPolicy:'network-only',
        onCompleted: (data) => {
            const confirmedUser = [];
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
                setMemberCheck(warning)
            }
            else if(difference.length === 0){
                setMemberCheck("");
                CreateSchedule();
                alert("Reservation Successfully Submitted")
                navigate('/');
            }
        }
    });


    return(
        <div className="ReservationSubmit">
            <div className="Warning">{memberCheck}</div>
            <button id="submit" className="Submit" onClick={() => {
                const newMembers = SplitMemberString(props.member)
                setMembers(newMembers);
                checkUsers();
            }}>Make Appointment</button>
        </div>
    )
}

export { Reservation };