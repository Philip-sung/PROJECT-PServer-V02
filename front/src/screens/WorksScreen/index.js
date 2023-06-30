//External Imports
import React from "react";

//Local Imports
import { Displayer, DisplayerContainer } from "../../components/Displayer";
import { TransitionObject } from "../../components/TransitionObj";

//Static Imports
import sampleImg from '../../assets/img/Sample2.jpeg';
import "./index.css";

function WorksScreen() {

    
    return (
        <div className="WorkScreen">
            <TransitionObject>
                <div style={{margin: 10, fontWeight: 700}}>COMPLETED</div>
            </TransitionObject>
            <DisplayerContainer>
                <Displayer name="SampleProject" img={sampleImg} action={"Link"} LinkTo={"/login"} />
                <Displayer name="SampleProject" img={sampleImg} action={"Link"} LinkTo={"/login"} />
                <Displayer name="SampleProject" img={sampleImg} action={"Link"} LinkTo={"/login"} />
                <Displayer name="SampleProject" img={sampleImg} action={"Link"} LinkTo={"/login"} />
                <Displayer name="SampleProject" img={sampleImg} action={"Link"} LinkTo={"/login"} />
                <Displayer name="SampleProject" img={sampleImg} action={"Link"} LinkTo={"/login"} />
                <Displayer name="SampleProject" img={sampleImg} action={"Link"} LinkTo={"/login"} />
                <Displayer name="SampleProject" img={sampleImg} action={"Link"} LinkTo={"/login"} />
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

export { WorksScreen }