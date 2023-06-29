import { makeObservable,
    action,
    observable,
   } from "mobx";

class userInfoStore {
    logOn = false;
    userID = '';
    userName = 'Anonymous';
    privilege = 'GUEST';

    constructor() {
        makeObservable(this,{
            logOn: observable,
            userName: observable,
            privilege: observable,
            toggleLogOnState: action,
            getLogOnState: action,
            setUserID: action,
            getUserID: action,
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

    getUserID() {
        return this.userID;
    }

    setUserID(id){
        this.userID = id;
    }

    getUserName() {
        return this.userName;
    }

    setUserName(name){
        this.userName = name;
    }
    
    setPrivilege(privilege){
        this.privilege = privilege;
    }

    getPrivilege(){
        return this.privilege;
    }
}

const userInfoStoreObj = new userInfoStore();

export { userInfoStoreObj };