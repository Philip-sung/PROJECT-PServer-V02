import { makeObservable,
    action,
    observable,
   } from "mobx";

class userInfoStore {
    loginState = false;
    curUser = {
        id: '',
        name: 'NONAME',
        privilege: 'GUEST'
    }

    constructor() {
        makeObservable(this,{
            loginState: observable,
            curUser: observable,
            toggleLogOnState: action,
            getLoginState: action,
            setUserID: action,
            getUserID: action,
            setUserName: action,
            getUserName: action,
            getPrivilege: action,
            setPrivilege: action
        });
    }

    GetUser() {
        return this.curUser;
    }

    toggleLogOnState() {
        this.loginState = !this.loginState;
    }

    getLoginState() {
        return this.loginState;
    }

    getUserID() {
        return this.curUser.id;
    }

    setUserID(id){
        this.curUser.id = id;
    }

    getUserName() {
        return this.curUser.name;
    }

    setUserName(name){
        this.curUser.name = name;
    }
    
    setPrivilege(privilege){
        this.curUser.privilege = privilege;
    }

    getPrivilege(){
        return this.curUser.privilege;
    }
}

const userInfoStoreObj = new userInfoStore();

export { userInfoStoreObj };