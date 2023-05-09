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
            decreaseCredit: action,
        });
        autorun(() => console.log(this.report));
    }

    increaseCredit() {
       this.credits++;
    }

    decreaseCredit() {
        this.credits--;
    }

    get reportCredit() {
        return `Your Credits : ${this.credits}`
    }
}

const creditStoreObj = new creditStore();

export { creditStoreObj };