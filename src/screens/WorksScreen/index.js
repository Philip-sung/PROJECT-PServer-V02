import React from "react";
import { Displayer, DisplayerContainer } from "../../components/Displayer";
import sampleImg from '../../assets/img/Sample2.jpeg';

function WorksScreen() {

    
    return (
        <div>
            <div style={{margin: 10, fontWeight: 700}}>COMPLETED</div>
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