import React from "react";
import { observer } from "mobx-react-lite";
import { timeStoreObj } from "../../store/timeStore";
import './index.css'

function TimeBar() {
    return(
        <div className="TimeBar">
            <TimeBlock store={timeStoreObj} hour={9} />
            <TimeBlock store={timeStoreObj} hour={10} />
            <TimeBlock store={timeStoreObj} hour={11} />
            <TimeBlock store={timeStoreObj} hour={12} />
            <TimeBlock store={timeStoreObj} hour={13} />
            <TimeBlock store={timeStoreObj} hour={14} />
            <TimeBlock store={timeStoreObj} hour={15} />
            <TimeBlock store={timeStoreObj} hour={16} />
            <TimeBlock store={timeStoreObj} hour={17} />
            <TimeBlock store={timeStoreObj} hour={18} />
            <TimeBlock store={timeStoreObj} hour={19} />
            <TimeBlock store={timeStoreObj} hour={20} />
            <TimeBlock store={timeStoreObj} hour={21} />
            <TimeBlock store={timeStoreObj} hour={22} />
            <TimeBlock store={timeStoreObj} hour={23} />
            <TimeBlock store={timeStoreObj} hour={24} />
        </div>
    )    
}

const TimeBlock = observer(({store, hour}) => {
    let selected = false;

    function selectTime() {
        console.log(`Selected Time : ${hour} `);
        if(store.isStartTimeSelected === false){
            store.SetStartTimeInSelectedDate(hour);
            store.SetEndTimeInSelectedDate(hour);
            console.log(`Starting Time Set to : ${store.selectedStartTime}`);
            store.SetIsStartTimeSelected();
            store.SetIsEndTimeNotSelected();
        }
        else if(store.isEndTimeSelected === false){
            store.SetEndTimeInSelectedDate(hour);
            console.log(`Ending Time Set to : ${store.selectedEndTime}`);
            store.SetIsEndTimeSelected();
            store.SetIsStartTimeNotSelected();
            if(store.selectedStartTime > store.selectedEndTime){
                alert("Invalid Time");
                store.SetStartTimeInSelectedDate(0);
                store.SetEndTimeInSelectedDate(24);
                store.SetIsStartTimeNotSelected();
                store.SetIsEndTimeNotSelected();
            }
        }
    }
    if(store.isStartTimeSelected || store.isEndTimeSelected) {
        if(store.selectedTime.getDate() * 100 + hour >= store.selectedStartTime.getDate() * 100 + store.selectedStartTime.getHours() && 
            store.selectedTime.getDate() * 100 + hour <= store.selectedEndTime.getDate() * 100 + store.selectedEndTime.getHours())
            selected = true;
    }
    else {
        selected = false;
    }


    return(
        <div className={selected? "TimeBlockSelected" : "TimeBlock"} onClick={selectTime}>{hour}</div>
    )
})

export { TimeBar };