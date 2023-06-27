import React from "react";
import { useState, useEffect } from "react";
import Logo from '../../logo.svg';
import './index.css';
import { CSSTransition } from "react-transition-group";
import { useQuery, gql } from '@apollo/client';
import CryptoJS from 'crypto-js';
import { useNavigate } from "react-router-dom";
import { userInfoStoreObj } from "../../store/userInfoStore";

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
                            <input className="loginInput" placeholder="Username" 
                                onChange={(e) => {setID(e.target.value)}} 
                                onKeyDown={(e) => {if(e.keyCode === 13){document.getElementById('loginButton').click()}}}
                            />
                        </div>
                        <div>
                            <input className="loginInput" placeholder="Password" 
                                onChange={(e) => {setPW(e.target.value)}} type="password" 
                                onKeyDown={(e) => {if(e.keyCode === 13){document.getElementById('loginButton').click()}}}
                            />
                        </div>
                        <LoginButton userID={userID} userPW={userPW} />
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}


function UserQuery(uID, uPW) {
    
    return (gql`
        query GetUsers{
            login(userID:"${uID}", userPW:"${uPW}"){
                userID
                userPW
                userName
                credit
                privilege
            }
        }`
    )
}

function EncryptModule(uPW){
    const userPW_E = CryptoJS.SHA512(uPW).toString().toUpperCase();
    return userPW_E;
}

function LoginButton(props) {
    const navigate = useNavigate();
    const uPW_E = EncryptModule(props.userPW);
    const {loading, error, data} = useQuery(UserQuery(props.userID, uPW_E));

    if(loading){
    }
    if(error){
        console.log(error.message);
    }

    return (
        <div>
            <button id="loginButton" className="loginButton" onClick={
                (e) => {
                    if(props.userID === '' || props.userPW === ''){
                        alert('Form Incompleted')} 
                    else{
                        if(data?.login === null){
                            console.log('!Login Failed');
                            alert('Invalid ID/PW');
                        }
                        else if(data?.login.userID === props.userID){
                            console.log('!Login Success')
                            userInfoStoreObj.toggleLogOnState();
                            userInfoStoreObj.setUserName(data?.login.userName);
                            userInfoStoreObj.setPrivilege(data?.login.privilege);
                            console.log('set user informations');
                            console.log(data?.login.userName);
                            navigate('/');
                        }
                    }}
                }>Log In</button>
        </div>
    )
}

export { LoginScreen }