import { observer } from "mobx-react-lite";
import React from "react";
import { TimeBar } from "../TimeBar";
import { Displayer, DisplayerContainer } from "../../components/Displayer";
import sampleImg from "../../assets/img/Sample.jpeg"

const Reservation = observer(({store}) => {
    if(store.isDateSelected === true && store.isEndTimeSelected === true){
        return(
            <div>
                <TimeBar />
                <br />
                <small> SELECTED : {store.selectedStartTime.getFullYear()} . {store.selectedStartTime.getMonth() + 1} . {store.selectedStartTime.getDate()} &nbsp;&nbsp;
                <strong>&#91; {store.selectedStartTime.getHours()}:00 ~ {store.selectedEndTime.getHours()}:00 &#93;</strong></small>
                <br />
                <br />
                <DisplayerContainer>
                    <Displayer name="SampleProject" img={sampleImg} />
                    <Displayer name="SampleProject" img={sampleImg} />
                    <Displayer name="SampleProject" img={sampleImg} />
                    <Displayer name="SampleProject" img={sampleImg} />
                    <Displayer name="SampleProject" img={sampleImg} />
                </DisplayerContainer>
                
            </div>
        )
    }
    else if(store.isDateSelected === true && store.isEndTimeSelected === false){
        return(
            <div>
                <TimeBar />
            </div>
        )
    }
    else if(store.isDateSelected === false){
        return(<div></div>)
    }
});

export { Reservation };