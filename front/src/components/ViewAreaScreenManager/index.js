import { observer } from "mobx-react-lite";
import { SearchScreen } from "../../screens/SearchScreen/index";
import { ReservationScreen } from "../../screens/ReservationScreen/index";
import { OnGoingScreen } from "../../screens/OnGoingScreen/index";
import { WorksScreen } from "../../screens/WorksScreen/index";
import { Clock } from "../Clock";
import GithubIcon from "../../assets/img/GithubW.png";
import BlogIcon from "../../assets/img/BlogW.png";
import VelogIcon from "../../assets/img/VelogW.png";

const ViewAreaScreenManager = observer(({store}) => {
    if (store.CurrentScreen === ""){
        return (
            <div>
                <Clock />
                Welcome!<br/><br/>
                This page will provide<br/><br/>
                Our Hot Topics, Recent Tools, etc.<br /><br /><br />
                <div style={{fontSize:10}}>Copyright © 2023 Philip Sung. All right reserved.</div>
                <br /><br />
                <a href={"http://github.com/Philip-sung"}><img src={GithubIcon} width={30} alt="Github"></img></a> &nbsp;
                <a href={"http://velog.io/@velog_sp"}><img src={VelogIcon} width={30} alt="Velog"></img></a> &nbsp;
                <a href={"http://blog.naver.com/spinnavor"}><img src={BlogIcon} width={30} alt="NaverBlog"></img></a>
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

export { ViewAreaScreenManager };