//External Imports
import React from "react"

//Static Imports
import "./index.css";

function NoticeOutline(){
    return(
        <div className="NoticeContainer">
            <div className="NoticeHeader">Notice</div>
            <NoticeProvider>
                <NoticeBar />
                <NoticeBar />
                <NoticeBar />
                <NoticeBar />
                <NoticeBar />
                <NoticeBar />
                <NoticeBar />
                <NoticeBar />
                <NoticeBar />
                <NoticeBar />
                <NoticeBar />
                <NoticeBar />
                <NoticeBar />
                <NoticeBar />
                <NoticeBar />
            </NoticeProvider>
        </div>
    )
}

function NoticeProvider({children}) {

    return(
        <div className="NoticeProvider">
            {children}
        </div>
    )
}

function NoticeBar() {
    return(
        <div className="NoticeBar">
            <div className="NoticeCheckbox">
                V
            </div>
            <div className="NoticeContent">
                <div><strong>DatePlaylist : Chun Sung</strong></div>
                <div>Chun Sung Invited you to New Project "DatePlaylist"</div>
            </div>
        </div>
    )
}

export { NoticeOutline };