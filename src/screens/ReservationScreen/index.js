import React from "react";
import './index.css';
import { CurrentCalander } from "../../components/Calander";

function ReservationScreen() {

    
    return (
        <div className="ReservationScreen">
            <CurrentCalander className="Calander" />
            <div className="Contents"></div>
        </div>
    )
}

export { ReservationScreen }