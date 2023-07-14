//External Imports
import React from "react";
import { Link } from "react-router-dom";

//Local Imports
import { TransitionObject } from "../TransitionObj";

//Static Imports
import "./index.css";

function Displayer(props) {
    const projectImg = props.img;
    const projectName = props.name;
    const onImgText = props.imgTxt;
    const link = props.LinkTo;
    const userFunction = props.function;
    let action = () => {alert("Action Not defined")};
    
    if (props.action === "Link") {
        return(
            <TransitionObject>
                    <Link className="Displayer" to={link}>
                        <img className="DisplayerImg" src={process.env.PUBLIC_URL + `/thumbnail/${projectImg}.png`} alt="DisplayerImg" />
                        <div className="onImgText">{onImgText}</div>
                        <div className="DisplayDescription">{projectName.split('\n').map((text, index) =>
                            <React.Fragment key={index}>{text}<br /></React.Fragment>)}
                        </div>
                    </Link>
            </TransitionObject>
        )
    }
    else if (props.action === "GetProjectName"){
        action = () => {alert(projectName)}
    }
    else if (props.action === "useFunction"){
        action = () => {userFunction()}
    }

    return(
        <TransitionObject>
                <div className="Displayer" onClick={action}>
                    <img className="DisplayerImg" src={process.env.PUBLIC_URL + `/thumbnail/${projectImg}.png`} alt="DisplayerImg" />
                    <div className="onImgText">{onImgText}</div>
                    <div className="DisplayDescription">{projectName.split('\n').map((text, index) =>
                        <React.Fragment key={index}>{text}<br /></React.Fragment>)}
                    </div>
                </div>
        </TransitionObject>
    );
}

function DisplayerContainer({children}) {

    return(
        <div className="DisplayerContainer">
            {children}
        </div>
    )
}

export { Displayer, DisplayerContainer };