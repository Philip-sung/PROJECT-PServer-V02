import React from "react";
import { useState, useEffect } from "react";
import Logo from '../../logo.svg';
import './index.css';
import { CSSTransition } from "react-transition-group";

function LoginScreen () {

    const [userID, setID] = useState('');
    const [userPW, setPW] = useState('');
    const [loginButton, setLoginButton] = useState(false);
    useEffect(() => {
        setLoginButton(true);
    },[])

    return(
        <div className="login">
            <CSSTransition in={loginButton} timeout={500} classNames="loginComponents" unmountOnExit>
                <div>
                    <div>
                        <img src={Logo} className="loginImg" alt="PhilipsLogo" />
                    </div>
                    <div className="loginBox">
                        M&nbsp;&nbsp;E&nbsp;&nbsp;M&nbsp;&nbsp;B&nbsp;&nbsp;E&nbsp;&nbsp;R&nbsp;&nbsp;S&nbsp;&nbsp;H&nbsp;&nbsp;I&nbsp;&nbsp;P<br/><br/>
                        <div>
                            <input className="loginInput" placeholder="Username" onChange={(e) => {setID(e.target.value)}} onKeyDown={(e) => {if(e.code === "Enter"){alert(`${userID} + ${userPW}`)}}}/>
                        </div>
                        <div>
                            <input className="loginInput" placeholder="Password" onChange={(e) => {setPW(e.target.value)}} type="password" onKeyDown={(e) => {if(e.code === "Enter"){alert(`${userID} + ${userPW}`)}}}/>
                        </div>
                        <div>
                            <button className="loginButton" onClick={(e) => {alert(`The ID(${userID}) or password you entered is incorrect.`)}}>Log In</button>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}

export { LoginScreen }