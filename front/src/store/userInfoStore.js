import { makeObservable,
    action,
    observable,
   } from "mobx";

class userInfoStore {
    logOn = false;
    userName = '';
    privilege = 'GUEST';

    constructor() {
        makeObservable(this,{
            logOn: observable,
            userName: observable,
            privilege: observable,
            toggleLogOnState: action,
            getLogOnState: action,
            setUserName: action,
            getUserName: action,
            getPrivilege: action,
            setPrivilege: action
        });
    }

    toggleLogOnState() {
        this.logOn = !this.logOn;
    }

    getLogOnState() {
        return this.logOn;
    }

    getUserName() {
        return `${this.userName}`;
    }

    setUserName(name){
        this.userName = name;
    }
    
    setPrivilege(privilege){
        this.privilege = privilege;
    }

    getPrivilege(privilege){
        return this.privilege;
    }
}

const userInfoStoreObj = new userInfoStore();

export { userInfoStoreObj };