import React from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useEffect, useState } from "react";
import "./index.css";

function Displayer(props) {
    const projectImg = props.img;
    const projectName = props.name;
    const [displayerMounted, setDisplayerMounted] = useState(false);
    useEffect(() => {
        setDisplayerMounted(true);
    },[])

    return(
        <CSSTransition in={displayerMounted} timeout={500} classNames="displayerMount" unmountOnExit>
                <Link className="Displayer" to="login">
                    <img className="DisplayerImg" src={projectImg} alt="DisplayerImg" />
                    <div className="DisplayDescription">{projectName}</div>
                </Link>
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