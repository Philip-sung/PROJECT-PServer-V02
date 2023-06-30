//External Imports
import React from "react";
import CryptoJS from 'crypto-js';
import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useLazyQuery, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";

//Local Imports
import { userInfoStoreObj } from "../../store/userInfoStore";

//Static Imports
import Logo from '../../logo.svg';
import './index.css';

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

function EncryptModule(uPW){
    const userPW_E = CryptoJS.SHA512(uPW).toString().toUpperCase();
    return userPW_E;
}

function UserQuery(uID, uPW) {
    
    return (gql`
        query GetUsers{
            getUserInfo(userID:"${uID}", userPW:"${uPW}"){
                userID
                userPW
                userName
                credit
                privilege
            }
        }`
    )
}

function LoginButton(props) {
    const [IDPW,setIDPW] = useState({ID:'', PW:''});
    const navigate = useNavigate();
    const uPW_E = EncryptModule(props.userPW);
    const [login,{loading, error}] = useLazyQuery(UserQuery(IDPW.ID, IDPW.PW), {
        onCompleted: (data) => {
            if(props.userID === '' || props.userPW === ''){
                alert('Authentication Form Incompleted');
            }
            else{
                if(data?.getUserInfo === null){
                    console.log('Authetication Failed');
                    alert('Invalid ID or Password');
                }
                else if(data?.getUserInfo.userID === IDPW.ID){
                    console.log('Authetication Success')
                    userInfoStoreObj.toggleLogOnState();
                    userInfoStoreObj.setUserID(data?.getUserInfo.userID);
                    userInfoStoreObj.setUserName(data?.getUserInfo.userName);
                    userInfoStoreObj.setPrivilege(data?.getUserInfo.privilege);
                    navigate('/');
                }
            }
        }
    });

    if(loading){
        console.log("Loading");
    }
    if(error){
        console.log(error.message);
    }

    return (
        <div>
            <button id="loginButton" className="loginButton" onClick={() => {
                    setIDPW({ID:props.userID, PW:uPW_E});
                    login();
                }
            }>Log In</button>
        </div>
    )
}

export { LoginScreen }