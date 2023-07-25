import { makeObservable,
    action,
    observable,
   } from "mobx";

class timeStore {
    selectedTime = new Date();
    selectedStartTime = new Date();
    selectedEndTime = new Date();
    isDateSelected = false;
    isStartTimeSelected = false;
    isEndTimeSelected = false;
    dayMarker = 0;

    constructor() {
        makeObservable(this,{
            selectedTime: observable,
            selectedStartTime: observable,
            selectedEndTime: observable,
            isDateSelected: observable,
            isStartTimeSelected: observable,
            isEndTimeSelected: observable,
            dayMarker: observable,
            SetTime: action,
            SetYear: action,
            SetMonth: action,
            SetDay: action,
            SetHours: action,
            SetMinutes: action,
            SetIsDateSelected: action,
            SetIsDateNotSelected: action,
            SetIsStartTimeSelected: action,
            SetIsStartTimeNotSelected: action,
            SetIsEndTimeSelected: action,
            SetIsEndTimeNotSelected: action,
            SetStartTimeInSelectedDate: action,
            SetEndTimeInSelectedDate: action,
            SetDayMarker: action,
            Initialize: action, 
            GetCurrentTimeString: action
        });
    }

    SetTime(year, month, date, hours, minutes, seconds){
        this.selectedTime.setFullYear(year);
        this.selectedTime.setMonth(month - 1);
        this.selectedTime.setDate(date);
        this.selectedTime.setHours(hours);
        this.selectedTime.setMinutes(minutes);
        this.selectedTime.setSeconds(seconds);
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

    SetIsDateSelected() {
        this.isDateSelected = true;
    }

    SetIsDateNotSelected() {
        this.isDateSelected = false;
    }

    SetIsStartTimeSelected() {
        this.isStartTimeSelected = true;
    }

    SetIsStartTimeNotSelected() {
        this.isStartTimeSelected = false;
    }
    SetIsEndTimeSelected() {
        this.isEndTimeSelected = true;
    }

    SetIsEndTimeNotSelected() {
        this.isEndTimeSelected = false;
    }

    SetStartTimeInSelectedDate(hours) {
        this.selectedStartTime = new Date(this.selectedTime.getTime());
        this.selectedStartTime.setHours(hours);
    }

    SetEndTimeInSelectedDate(hours) {
        this.selectedEndTime = new Date(this.selectedTime.getTime());
        this.selectedEndTime.setHours(hours);
    }

    SetDayMarker(date) {
        this.dayMarker = date;
    }

    Initialize() {
        this.isDateSelected = false;
        this.isEndTimeSelected = false;
        this.isStartTimeSelected = false;
        this.selectedTime = new Date();
        this.selectedStartTime = new Date();
        this.selectedEndTime = new Date();
    }

    GetCurrentTimeString() {
        const curTime = new Date();
        const Days = ['Sn','Mn','Tu','Wd','Th','Fr','St'];
        const curDay = Days[curTime.getDay()].toString();
        const timeString = `${curTime.getFullYear().toString().padStart(2,'0')}.${(curTime.getMonth() + 1).toString().padStart(2,'0')}.${curTime.getDate().toString().padStart(2,'0')} ${curDay} ${curTime.getHours().toString().padStart(2,'0')}:${curTime.getMinutes().toString().padStart(2,'0')}`;
       
        return timeString;
    }
}

const timeStoreObj = new timeStore();

export { timeStoreObj };