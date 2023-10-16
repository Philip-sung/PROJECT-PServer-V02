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
    const action = props.action;            //Link || GetProjectName || useFunction(with function props)
    let userFunction = props.function;      //if action == UseFunction -> define userFunction as props.function
    const defaultFunction = () => {alert("Action Not defined")};
    const parameter = props.parameter;
    
    userFunction = defaultFunction;
    
    if (action === "Link") {
        return(
            <TransitionObject>
                    <Link className="Displayer" LinkTo={link}>
                        <img className="DisplayerImg" src={process.env.PUBLIC_URL + `/thumbnail/${projectImg}.png`} alt="DisplayerImg" />
                        <div className="onImgText">{onImgText}</div>
                        <div className="DisplayDescription">{projectName.split('\n').map((text, index) =>
                            <React.Fragment key={index}>{text}<br /></React.Fragment>)}
                        </div>
                    </Link>
            </TransitionObject>
        )
    }
    else if (action === "ExternalLink"){
        return(
            <TransitionObject>
                    <div className="Displayer" onClick={() =>{window.location.replace('https://' + link, '_blank')}}>
                        <img className="DisplayerImg" src={process.env.PUBLIC_URL + `/thumbnail/${projectImg}.png`} alt="DisplayerImg" />
                        <div className="onImgText">{onImgText}</div>
                        <div className="DisplayDescription">{projectName.split('\n').map((text, index) =>
                            <React.Fragment key={index}>{text}<br /></React.Fragment>)}
                        </div>
                    </div>
            </TransitionObject>
        )
    }
    else if (action === "GetProjectName"){
        userFunction = () => {alert(`${projectName} in Processing`)}
    }
    else if (action === "UseFunction"){
        userFunction = props.function;
    }

    const handleImgError = (e) => {
        e.target.src = process.env.PUBLIC_URL + `/thumbnail/Public.png`;
    }

    return(
        <TransitionObject>
                <div className="Displayer" onClick={() => {userFunction(parameter)}}>
                    <img className="DisplayerImg" src={process.env.PUBLIC_URL + `/thumbnail/${projectImg}.png`} onError={handleImgError} alt="DisplayerImg"/>
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