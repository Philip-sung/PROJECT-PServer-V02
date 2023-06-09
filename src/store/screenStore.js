import {
    makeObservable,
    observable,
    action,
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

    PushScreenStack() {
        this.prevScreens.push(this.CurrentScreen);
    }

    GetNewScreen(screenName) {
        this.prevScreens.push(this.currentScreen);
        this.currentScreen = screenName;

        return this.currentScreen;
    }

    GetPrevScreen() {
        if(this.prevScreens.length === 0) {
            alert("Initial Page");
            console.log("Initial Page");
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

    get CurrentScreen() {
        return `${this.currentScreen}`;
    }
}

const screenStoreObj = new screenStore();

export { screenStoreObj };