//External Imports
import React from "react";

//Local Imports
import { Displayer, DisplayerContainer } from "../../components/Displayer";
import { TransitionObject } from "../../components/TransitionObj";

//Static Imports
import sampleImg from '../../assets/img/Sample.jpeg';
import "./index.css"

function OnGoingScreen() {

    
    return (
        <div className="onGoingScreen">
            <TransitionObject>
                <div style={{margin: 10, fontWeight: 700}}>IN PROGRESS</div>
            </TransitionObject>
            <DisplayerContainer>
                <Displayer name="SampleProject" img={sampleImg} action={"Link"} LinkTo={"/login"} />
                <Displayer name="SampleProject" img={sampleImg} action={"Link"} LinkTo={"/login"} />
                <Displayer name="SampleProject" img={sampleImg} action={"Link"} LinkTo={"/login"} />
                <Displayer name="SampleProject" img={sampleImg} action={"Link"} LinkTo={"/login"} />
                <Displayer name="SampleProject" img={sampleImg} action={"Link"} LinkTo={"/login"} />
                <Displayer name="SampleProject" img={sampleImg} action={"Link"} LinkTo={"/login"} />
                <Displayer name="SampleProject" img={sampleImg} action={"Link"} LinkTo={"/login"} />
            </DisplayerContainer>
        </div>
    )
}

export { OnGoingScreen }