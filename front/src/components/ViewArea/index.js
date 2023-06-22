import React from "react";
import "./index.css";
import { screenStoreObj } from "../../store/screenStore";
import { ViewAreaScreenManager } from "../ViewAreaScreenManager";

function ViewArea(props) {
    
    return(
        <div className={props.className}>
            <ViewAreaScreenManager store={screenStoreObj} />
        </div>
    )
}

export { ViewArea }