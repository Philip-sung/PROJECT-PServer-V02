import React from "react";
import { Displayer, DisplayerContainer } from "../../components/Displayer";
import sampleImg from '../../assets/img/Sample2.jpeg';

function WorksScreen() {

    
    return (
        <div>
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