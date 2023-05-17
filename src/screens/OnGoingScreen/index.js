import React from "react";
import { Displayer } from "../../components/Displayer";

function OnGoingScreen() {

    
    return (
        <div>
            This is OnGoing Screen.
            <div style={{display: "flex", margin: 10}}>
            <Displayer />
            <Displayer />
            <Displayer />
            </div>
        </div>
    )
}

export { OnGoingScreen }