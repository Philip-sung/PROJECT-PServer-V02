import React from "react";
import "./index.css";
import sampleImg from '../../assets/img/Sample.jpeg';

function Displayer() {


    return(
        <div className="Displayer">
            <img className="DisplayerImg" src={sampleImg} />
            <div className="DisplayDescription">[PROJECT]Test Project</div>
        </div>
    );
}

export { Displayer };