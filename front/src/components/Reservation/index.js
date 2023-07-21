//External Imports
import React from "react";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { gql, useMutation } from "@apollo/client";

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

    const[projectName, SetProjectName] = useState("");

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
                    <CreateScheduleButton project={projectName} />
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

function CreateScheduleButton(props) {
    const scheduleStart = timeStoreObj.selectedStartTime;
    const scheduleEnd = timeStoreObj.selectedEndTime;

    const dateString = `${scheduleStart.getFullYear()}.${scheduleStart.getMonth() + 1}.${scheduleStart.getDate()}`;
    const startTimeString = `${scheduleStart.getHours()}:${scheduleStart.getMinutes()}`;
    const endTimeString = `${scheduleEnd.getHours()}:${scheduleEnd.getMinutes()}`;

    const [CreateSchedule] = useMutation(createScheduleQuery,{
        variables: {
            project: props.project,
            createdTime: "FOO",
            startTime: `${dateString} ${startTimeString}`,
            endTime: `${dateString} ${endTimeString}`,
            proposer: userInfoStoreObj.curUser.id,
            content: "CONTENT",
            member: ["PhilipSung", "t"]
        }
    })

    return(
        <button className="Submit" onClick={() => {
            CreateSchedule();
            alert(`${timeStoreObj.selectedStartTime} ~ ${timeStoreObj.selectedEndTime}, Project : ${props.project}`)
        }}>Make Appointment</button>
    )
}

export { Reservation };