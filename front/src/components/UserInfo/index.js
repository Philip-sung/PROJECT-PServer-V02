import { observer } from "mobx-react-lite";
import { useState, useEffect } from 'react';
import './index.css';

const UserInfoView = observer(({store}) => {

    const [userName, setUserName] = useState('NONAME');
    const [userPrivilege, setUserPrivilege] = useState('GUEST');
    // eslint-disable-next-line
    useEffect(() => {setUserName(store.getUserName())},[store.curUser.name]);
    // eslint-disable-next-line
    useEffect(() => {setUserPrivilege(store.getPrivilege())},[store.curUser.privilege]);

    return(
        <div>
            <div><small style={{fontSize:10}}><strong>{userName}</strong></small></div>
            <div><small style={{fontSize:10}}>{userPrivilege}</small></div>
        </div>
    );
});

export { UserInfoView };