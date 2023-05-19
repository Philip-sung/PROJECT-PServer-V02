import React from "react";
import { Displayer, DisplayerContainer } from "../../components/Displayer";
import sampleImg from '../../assets/img/Sample.jpeg';

function OnGoingScreen() {

    
    return (
        <div className="onGoingScreen">
        <div style={{margin: 10, fontWeight: 700}}>IN PROGRESS</div>
            <DisplayerContainer>
                <Displayer name="SampleProject" img={sampleImg} />
                <Displayer name="SampleProject" img={sampleImg} />
                <Displayer name="SampleProject" img={sampleImg} />
                <Displayer name="SampleProject" img={sampleImg} />
                <Displayer name="SampleProject" img={sampleImg} />
                <Displayer name="SampleProject" img={sampleImg} />
                <Displayer name="SampleProject" img={sampleImg} />
            </DisplayerContainer>
        </div>
    )
}

export { OnGoingScreen }