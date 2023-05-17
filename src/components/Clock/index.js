import React from "react";
import { useEffect, useState } from "react";
import "./index.css";

function Clock() {
    const interval = 1000;
    const [curTime, setCurTime] = useState(new Date());

    useEffect(() => { 
        const interval_id = setInterval(() => {
            setCurTime(new Date());
            return (() => {clearInterval(interval_id)})
        }, interval);
    }, [])

    return (<ClockDisplay Time={curTime} />);
}

function ClockDisplay(props) {
    return(
        <div>
            {props.Time.getFullYear()}. {props.Time.getMonth()}. {props.Time.getDate()}
            <div className="ClockDisplay">
                <div className="TextBox">{props.Time.getHours()}</div> : <div className="TextBox">{props.Time.getMinutes()}</div> : <div className="TextBox">{props.Time.getSeconds()}</div>
            </div>
        </div>
    );
}

export { Clock }