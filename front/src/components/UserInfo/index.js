import { observer } from "mobx-react-lite";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { userInfoStoreObj } from "../../store/userInfoStore";

import './index.css';
import Info from "../../ServiceInformation";

const UserInfoView = observer(({store}) => {

    const [userName, setUserName] = useState('NONAME');
    const [userPrivilege, setUserPrivilege] = useState('GUEST');
    const navigate = useNavigate();

    // eslint-disable-next-line
    useEffect(() => {setUserName(store.getUserName())},[store.curUser.name]);
    // eslint-disable-next-line
    useEffect(() => {setUserPrivilege(store.getPrivilege())},[store.curUser.privilege]);

    return(
        <div>
            {store.loginState === true?
                <button className="LoginButton" onClick={() => {LogOut(); navigate('/');}}>LogOut</button>
                 : <Link className="LoginButton" to="login" >Log In</Link>}
            <div><small style={{fontSize:10}}><strong>{userName}</strong></small></div>
            <div><small style={{fontSize:10}}>{userPrivilege}</small></div>
        </div>
    );
});

function LogOut() {
  window.fetch(Info.logoutURI, {credentials: 'include'});
  userInfoStoreObj.setStateLogout();
  userInfoStoreObj.setUserName('NONAME');
  userInfoStoreObj.setPrivilege('GUEST');
}


export { UserInfoView };