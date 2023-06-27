import { observer } from "mobx-react-lite";
import { useState, useEffect } from 'react';
import './index.css';

const UserInfoView = observer(({store}) => {

    const [userName, setUserName] = useState('GUEST');
    const [userPrivilege, setUserPrivilege] = useState('GUEST');

    useEffect(() => {setUserName(store.getUserName())},[store.getUserName()]);
    useEffect(() => {setUserPrivilege(store.getUserPrivilege())},[store.getUserPrivilege()]);

    return(
        <div>
            <div><small style={{fontSize:10}}><strong>{userName}</strong></small></div>
            <div><small style={{fontSize:10}}>{userPrivilege}</small></div>
        </div>
    );
});

export { UserInfoView };