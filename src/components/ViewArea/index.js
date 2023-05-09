import React from "react";
import "./index.css";
import { screenStoreObj } from "../../store/screenStore";
import { ScreenManager } from "../ScreenManager";

function ViewArea(props) {
    
    return(
        <div className={props.className}>
            <ScreenManager store={screenStoreObj} />
        </div>
    )
}

export { ViewArea }