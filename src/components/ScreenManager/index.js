import { observer } from "mobx-react-lite";
import { SearchScreen } from "../../screens/SearchScreen/index";
import { ReservationScreen } from "../../screens/ReservationScreen/index";
import { OnGoingScreen } from "../../screens/OnGoingScreen/index";
import { WorksScreen } from "../../screens/WorksScreen/index";

const ScreenManager = observer(({store}) => {
    if (store.CurrentScreen === ""){
        return (
            <div>
                Welcome!<br/><br/>
                <small>This page will going to provide</small><br/><br/>
                Hot Topics, Recent Tools, etc.
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