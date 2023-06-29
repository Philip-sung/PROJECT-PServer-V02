import React from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useEffect, useState } from "react";
import "./index.css";

function Displayer(props) {
    const projectImg = props.img;
    const projectName = props.name;
    const onImgText = props.imgTxt;
    const link = props.LinkTo;
    const userFunction = props.function;
    const value = props.value;
    let action = () => {alert("Action Not defined")};
    const [displayerMounted, setDisplayerMounted] = useState(false);
    useEffect(() => {
        setDisplayerMounted(true);
    },[])
    
    if (props.action === "Link") {
        return(
            <CSSTransition in={displayerMounted} timeout={500} classNames="displayerMount" unmountOnExit>
                    <Link className="Displayer" to={link}>
                        <img className="DisplayerImg" src={projectImg} alt="DisplayerImg" />
                        <div className="onImgText">{onImgText}</div>
                        <div className="DisplayDescription">{projectName.split('\n').map((text, index) =>
                            <React.Fragment key={index}>{text}<br /></React.Fragment>)}
                        </div>
                    </Link>
            </CSSTransition>
        )
    }
    else if (props.action === "GetProjectName"){
        action = () => {alert(projectName)}
    }
    else if (props.action === "SetValue"){
        action = () => {userFunction(value)}
    }

    return(
        <CSSTransition in={displayerMounted} timeout={500} classNames="displayerMount" unmountOnExit>
                <div className="Displayer" onClick={action}>
                    <img className="DisplayerImg" src={projectImg} alt="DisplayerImg" />
                    <div className="onImgText">{onImgText}</div>
                    <div className="DisplayDescription">{projectName.split('\n').map((text, index) =>
                        <React.Fragment key={index}>{text}<br /></React.Fragment>)}
                    </div>
                </div>
        </CSSTransition>
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