import {
    makeObservable,
    observable,
    action,
    autorun,
    computed,
} from 'mobx'

class screenStore {
    currentScreen = "";
    prevScreens = [];

    constructor() {makeObservable(this, {
            currentScreen: observable,
            prevScreens: observable,
            GetNewScreen: action,
            GetPrevScreen: action
        });
    }

    GetNewScreen(screenName) {
        this.prevScreens.push(this.currentScreen);
        this.currentScreen = screenName;
        alert(`${screenName} Screen Clicked`);

        return this.currentScreen;
    }

    GetPrevScreen() {
        if(this.prevScreens.length == 0) {
            alert("First Screen");
            console.log("First Screen");
        }
        else if (this.prevScreens.length > 0) {
            this.currentScreen = this.prevScreens.pop();
        }

        return this.currentScreen;
    }

    Report() {
        console.log(`{Current Screen : ${this.currentScreen}}`)
        console.log(`{Previous Screens : ${this.prevScreens}}`)
    }
}

const screenStoreObj = new screenStore();

export { screenStoreObj };