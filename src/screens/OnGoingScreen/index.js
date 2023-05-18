import React from "react";
import { Displayer, DisplayerContainer } from "../../components/Displayer";
import sampleImg from '../../assets/img/Sample.jpeg';

function OnGoingScreen() {

    
    return (
        <div className="onGoingScreen">
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