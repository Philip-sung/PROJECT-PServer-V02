import { makeObservable,
         action,
         observable,
         autorun,
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
        return `${this.credits} Credits`
    }
}

const creditStoreObj = new creditStore();

export { creditStoreObj };