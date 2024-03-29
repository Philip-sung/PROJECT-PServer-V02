import {
    makeObservable,
    observable,
    action,
} from 'mobx'

class screenStore {
    currentScreen = {
        screenName: "",
        screenID: ""
    };
    prevScreens = [];

    constructor() {makeObservable(this, {
            currentScreen: observable,
            prevScreens: observable,
            GetNewScreen: action,
            GetCurrentScreen: action,
            GetPrevScreen: action
        });
    }

    PushScreenStack() {
        this.prevScreens.push(this.CurrentScreen);
    }

    GetNewScreen(screenName, screenID = "") {
        this.prevScreens.push({...this.currentScreen});
        this.currentScreen.screenName = screenName;
        this.currentScreen.screenID = screenID;

        return this.currentScreen;
    }

    GetCurrentScreen() {
        return this.currentScreen;
    }

    GetPrevScreen() {
        if(this.prevScreens.length === 0) {
            alert("Initial Page");
            console.log("[USER]WELCOME : INITIAL PAGE");
        }
        else if (this.prevScreens.length > 0) {
            this.currentScreen = this.prevScreens.pop();
        }

        return this.currentScreen;
    }

    Report() {
        console.log(`[DEV]{Current Screen : ${this.currentScreen.screenName}:${this.currentScreen.screenID}}`)
        console.log(`[DEV]{Previous Screens`, this.prevScreens)
    }

    get CurrentScreen() {
        return `${this.currentScreen}`;
    }
}

const screenStoreObj = new screenStore();

export { screenStoreObj };