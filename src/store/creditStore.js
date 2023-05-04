import { makeObservable,
         action,
         observable,
         autorun,
         computed,
        } from "mobx";

class creditStore {
    credits = 0;

    constructor() {
        makeObservable(this,{
            credits: observable,
            increaseCredit: action,
            decreaseCredit: action
        });
    }

    increaseCredit() {
        this.credits++

        return this.credits;
    }

    decreaseCredit() {
        this.credits--;

        return this.credits;
    }

    get reportCredit() {
        return `Your Credits : ${this.credits}`
    }
}

const creditstore = new creditStore();

export { creditstore };