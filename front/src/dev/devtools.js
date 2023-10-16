import { screenStoreObj } from '../store/screenStore';

function DevReport () {
    console.log("[DEV]Developer Report");
    screenStoreObj.Report();
}

export { DevReport }