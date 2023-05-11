import React from "react";
import { useState } from "react";
import Logo from '../../logo.svg';
import './index.css';

function LoginScreen () {

    const [userID, setID] = useState('');
    const [userPW, setPW] = useState('');

    return(
        <div className="login">
            <div>
                <img src={Logo} className="loginImg" alt="PhilipsLogo" />
            </div>
            <div className="loginBox">
                <div>
                    <input className="loginInput" placeholder="Username" onChange={(e) => {setID(e.target.value)}} onKeyDown={(e) => {if(e.code === "Enter"){alert(`${userID} + ${userPW}`)}}}/>
                </div>
                <div>
                    <input className="loginInput" placeholder="Password" onChange={(e) => {setPW(e.target.value)}} type="password" onKeyDown={(e) => {if(e.code === "Enter"){alert(`${userID} + ${userPW}`)}}}/>
                </div>
                <div>
                    <button className="loginButton" onClick={(e) => {alert(`${userID} + ${userPW}`)}}>Log In</button>
                </div>
            </div>
        </div>
    );
}

export { LoginScreen }