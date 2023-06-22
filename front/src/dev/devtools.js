import { screenStoreObj } from '../store/screenStore';

function DevReport () {
    console.log("**Developers' Report**");
    screenStoreObj.Report();
}

export { DevReport }