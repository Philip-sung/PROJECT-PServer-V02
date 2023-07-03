//External Imports
import { observer } from "mobx-react-lite";

//Local Imports
import { SearchScreen } from "../../screens/SearchScreen/index";
import { ReservationScreen } from "../../screens/ReservationScreen/index";
import { OnGoingScreen } from "../../screens/OnGoingScreen/index";
import { WorksScreen } from "../../screens/WorksScreen/index";
import { PostReadScreen } from "../../screens/PostReadScreen";
import { Clock } from "../Clock";

//Static Imports
import GithubIcon from "../../assets/img/GithubW.png";
import BlogIcon from "../../assets/img/BlogW.png";
import VelogIcon from "../../assets/img/VelogW.png";

const ViewAreaScreenManager = observer(({store}) => {
    if (store.GetCurrentScreen().screenName === ""){
        return (
            <div>
                <Clock />
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
    if (store.currentScreen.screenName === "Search"){
        return (
            <SearchScreen />
        )
    }
    else if (store.currentScreen.screenName === "Reservation"){
        return (
            <ReservationScreen />
        )
    }
    else if (store.currentScreen.screenName === "OnGoing"){
        return (
            <OnGoingScreen />
        )
    }
    else if (store.currentScreen.screenName === "Works"){
        return (
            <WorksScreen />
        )
    }
    else if (store.currentScreen.screenName === "PostRead"){
        return (
            <PostReadScreen postID={store.currentScreen.screenID} />
        )
    }

})
export { ViewAreaScreenManager };