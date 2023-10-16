import { makeObservable,
         action,
         observable,
        } from "mobx";

class creditStore {
    credits = 0;

    constructor() {
        makeObservable(this,{
            credits: observable,
            increaseCredit: action,
            decreaseCredit: action,
        });
    }

    increaseCredit() {
       this.credits++;
    }

    decreaseCredit() {
        this.credits--;
    }

    get reportCredit() {
        return `${this.credits} Credits`
    }
}

const creditStoreObj = new creditStore();

export { creditStoreObj };