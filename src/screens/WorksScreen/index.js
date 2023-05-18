import React from "react";
import { Displayer, DisplayerContainer } from "../../components/Displayer";
import sampleImg from '../../assets/img/Sample2.jpeg';

function WorksScreen() {

    
    return (
        <div>
            <DisplayerContainer>
                <Displayer name="SampleProject" img={sampleImg} />
                <Displayer name="SampleProject" img={sampleImg} />
                <Displayer name="SampleProject" img={sampleImg} />
                <Displayer name="SampleProject" img={sampleImg} />
                <Displayer name="SampleProject" img={sampleImg} />
                <Displayer name="SampleProject" img={sampleImg} />
                <Displayer name="SampleProject" img={sampleImg} />
                <Displayer name="SampleProject" img={sampleImg} />
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

export { WorksScreen }