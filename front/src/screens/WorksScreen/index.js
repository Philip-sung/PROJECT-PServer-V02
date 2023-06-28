import React from "react";
import { Displayer, DisplayerContainer } from "../../components/Displayer";

//Static Imports
import sampleImg from '../../assets/img/Sample2.jpeg';
import "./index.css";

function WorksScreen() {

    
    return (
        <div className="WorkScreen">
            <div style={{margin: 10, fontWeight: 700}}>COMPLETED</div>
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