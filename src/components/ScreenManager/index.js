import { observer } from "mobx-react-lite";
import { SearchScreen } from "../../screens/SearchScreen/index";
import { ReservationScreen } from "../../screens/ReservationScreen/index";
import { OnGoingScreen } from "../../screens/OnGoingScreen/index";
import { WorksScreen } from "../../screens/WorksScreen/index";
import { Clock } from "../Clock";

const ScreenManager = observer(({store}) => {
    if (store.CurrentScreen === ""){
        return (
            <div>
                <Clock />
                Welcome!<br/><br/>
                This page will going to provide<br/><br/>
                Our Hot Topics, Recent Tools, etc.<br /><br /><br />
                <div style={{fontSize:10}}>Copyright © 2023 Philip Sung. All right reserved.</div>
            </div>
        )
    }
    if (store.CurrentScreen === "Search"){
        return (
            <SearchScreen />
        )
    }
    else if (store.CurrentScreen === "Reservation"){
        return (
            <ReservationScreen />
        )
    }
    else if (store.CurrentScreen === "OnGoing"){
        return (
            <OnGoingScreen />
        )
    }
    else if (store.CurrentScreen === "Works"){
        return (
            <WorksScreen />
        )
    }
})

export { ScreenManager };