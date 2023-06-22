import React from "react";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { TimeBar } from "../TimeBar";
import { Displayer, DisplayerContainer } from "../../components/Displayer";
import './index.css';
import sampleImg from "../../assets/img/Sample.jpeg"

const Reservation = observer(({store}) => {

    const[projectName, SetProjectName] = useState("");

    if(store.isDateSelected === true && store.isEndTimeSelected === true && projectName !== ""){
        return(
            <div>
                <TimeBar />
                <br />
                <small> SELECTED : {store.selectedStartTime.getFullYear()} . {store.selectedStartTime.getMonth() + 1} . {store.selectedStartTime.getDate()} &nbsp;&nbsp;
                <strong>&#91; {store.selectedStartTime.getHours()}:00 ~ {store.selectedEndTime.getHours()}:00 &#93;</strong></small>
                <br />
                <br />
                <DisplayerContainer>
                    <Displayer name="SampleProject" img={sampleImg} action={"SetValue"} function={SetProjectName} value={"SampleProject1"} />
                    <Displayer name="SampleProject" img={sampleImg} action={"SetValue"} function={SetProjectName} value={"SampleProject2"} />
                    <Displayer name="SampleProject" img={sampleImg} action={"SetValue"} function={SetProjectName} value={"SampleProject3"} />
                    <Displayer name="SampleProject" img={sampleImg} action={"SetValue"} function={SetProjectName} value={"SampleProject4"} />
                    <Displayer name="SampleProject" img={sampleImg} action={"SetValue"} function={SetProjectName} value={"SampleProject5"} />
                </DisplayerContainer>
                <button className="Submit" onClick={() => alert(`${store.selectedStartTime} ~ ${store.selectedEndTime}, Project : ${projectName}`)}>Make Appointment</button>
                
            </div>
        )
    }
    else if(store.isDateSelected === true && store.isEndTimeSelected === true && projectName === ""){
        return(
            <div>
                <TimeBar />
                <br />
                <small> SELECTED : {store.selectedStartTime.getFullYear()} . {store.selectedStartTime.getMonth() + 1} . {store.selectedStartTime.getDate()} &nbsp;&nbsp;
                <strong>&#91; {store.selectedStartTime.getHours()}:00 ~ {store.selectedEndTime.getHours()}:00 &#93;</strong></small>
                <br />
                <br />
                <DisplayerContainer>
                    <Displayer name="SampleProject" img={sampleImg} action={"SetValue"} function={SetProjectName} value={"SampleProject1"} />
                    <Displayer name="SampleProject" img={sampleImg} action={"SetValue"} function={SetProjectName} value={"SampleProject2"} />
                    <Displayer name="SampleProject" img={sampleImg} action={"SetValue"} function={SetProjectName} value={"SampleProject3"} />
                    <Displayer name="SampleProject" img={sampleImg} action={"SetValue"} function={SetProjectName} value={"SampleProject4"} />
                    <Displayer name="SampleProject" img={sampleImg} action={"SetValue"} function={SetProjectName} value={"SampleProject5"} />
                </DisplayerContainer>
                
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

export { Reservation };