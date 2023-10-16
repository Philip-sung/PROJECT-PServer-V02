//Extrenal Imports
import React from "react";
import { CSSTransition } from "react-transition-group";
import { useEffect, useState } from "react";

//Static Imports
import "./index.css"

function TransitionObject({children}) {
    const [transitionObjMounted, setTransitionObjMounted] = useState(false);
    useEffect(() => {
        setTransitionObjMounted(true);
    },[])

    return(
        <CSSTransition in={transitionObjMounted} timeout={500} classNames="TransitionObjMount" unmountOnExit>
            <React.Fragment>
                {children}
            </React.Fragment>
        </CSSTransition>
    )
}

export { TransitionObject };