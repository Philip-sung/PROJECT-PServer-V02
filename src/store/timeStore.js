import { makeObservable,
    action,
    observable,
   } from "mobx";

class timeStore {
    selectedTime = new Date();

    constructor() {
        makeObservable(this,{
            selectedTime: observable,
            SetTime: action,
            SetYear: action,
            SetMonth: action,
            SetDay: action,
            SetHours: action,
            SetMinutes: action
        });
    }

    SetTime(year, month, day, date, hours, minutes){
        this.selectedTime.setFullYear(year);
        this.selectedTime.setMonth(month - 1);
        this.selectedTime.setDay(day);
        this.selectedTime.setDate(date);
        this.selectedTime.setHours(hours);
        this.selectedTime.setMinutes(minutes);
    }

    SetYear(year) {
        this.selectedTime.setFullYear(year);
    }

    SetMonth(month) {
        this.selectedTime.setMonth(month - 1);
    }

    SetDay(day) {
        this.selectedTime.setDay(day);
    }

    SetDate(date) {
        this.selectedTime.setDate(date);
    }

    SetHours(hours) {
        this.selectedTime.setHours(hours);
    }

    SetMinutes(minutes) {
        this.selectedTime.setMinutes(minutes);
    }
}

const timeStoreObj = new timeStore();

export { timeStoreObj };