//Local Imports
import { TransitionObject } from "../../components/TransitionObj";

//Static Imports
import "./index.css";

function MyPageScreen() {
    return(
        <TransitionObject>
            <div className="MyPageLayout">
                <div className="MyPageUser">
                    Philip Sung : Owner of Philipsung.com
                </div>
                <div className="MyPageInfo">
                    <div className="MyPageAlarm">
                        Notice
                    </div>
                    <div className="MyPageProject">
                        <div className="MyProjects">
                            MY Projects
                        </div>
                        <div className="ProjectWindow">
                            Project Information
                        </div>
                    </div>
                </div>
            </div>
        </TransitionObject>
    )
}

export {MyPageScreen};