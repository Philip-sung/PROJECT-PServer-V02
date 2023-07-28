//External Imports
import React, { useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client";

//Local Imports
import { userInfoStoreObj } from "../../store/userInfoStore";
import { noticeStoreObj } from "../../store/noticeStore";

//Static Imports
import "./index.css";
import closeButtonIcon from "../../assets/img/CloseButtonIcon.png";

function NoticeOutline(){
    const [noticeNumber, setNoticeNumber] = useState(0);

    return(
        <div className="NoticeContainer">
            <div className="NoticeHeader">Notice</div>
            <NoticeProvider>
                <NoticeMapper setNoticeNumber={setNoticeNumber} />
                {(noticeNumber <= 0) ? ( <EmptyNotice />) : <></>}
                {(noticeNumber <= 1) ? ( <EmptyNotice />) : <></>}
                {(noticeNumber <= 2) ? ( <EmptyNotice />) : <></>}
                <TransparentNotice />
            </NoticeProvider>
        </div>
    )
}

function EmptyNotice() {
    return(
        <div className="NoticeBar" style={{opacity:0.7}}>
            <div className="NoticeThumbnail" style={{borderStyle: "dashed"}}>
                Empty
            </div>
            <div className="NoticeContent">
                <div><strong>Empty Notice</strong></div>
                <div>Your received notice will be projected here.</div>
            </div>
            <img className="NoticeRemover" src={closeButtonIcon} style={{opacity:0}} alt="NoticeRemover" />
        </div>
    )
}
function TransparentNotice() {
    return(
        <div className="NoticeBarTransparent">
            <div className="NoticeThumbnail" style={{borderStyle: "dashed"}}>
                Empty
            </div>
            <div className="NoticeContent">
                <div><strong>Empty Notice</strong></div>
                <div>Your received notice will be projected here.</div>
            </div>
            <img className="NoticeRemover" src={closeButtonIcon} style={{opacity:0}} alt="NoticeRemover" />
        </div>
    )
}

const getUserNoticeQuery = gql`
    query GetUserNotice($userID: String){
        getUserNotice(userID: $userID){
            _id
            project
            title
            from
            to
            content
            time
        }
    }
`
function NoticeProvider({children}) {

    return(
        <div className="NoticeProvider">
            {children}
        </div>
    )
}

function NoticeMapper(props) {
    const {data} = useQuery(getUserNoticeQuery,{
        variables: {
            userID: userInfoStoreObj.curUser.id
        },
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            props.setNoticeNumber(data?.getUserNotice?.length);
        }
    });

    return(
        data?.getUserNotice.map(({_id, project, title, from, to, content, time}) => (
            <NoticeBar
                id={_id}
                key={_id}
                _id={_id}
                project={project}
                title={title}
                from={from}
                to={to}
                content={content}
                time={time}
                />
        ))
    )
}

const deleteNoticeQuery = gql`
    mutation deleteNotice($_id: ID){
        deleteNotice(_id: $_id){
            title
        }
    }
`

function NoticeBar(props) {

    const [exist,setExist] = useState(true);
    const [visible, setVisible] = useState(true);
    const [deleteNotice] = useMutation(deleteNoticeQuery,{
        variables: {
            _id: props._id
        },
        fetchPolicy:'network-only'
    })

    const handleImgError = (e) => {
        e.target.src = process.env.PUBLIC_URL + `/thumbnail/Public.png`;
    }

    return(
        <div className={exist? (visible? "NoticeBar" : "NoticeBarInvisible") : "NoticeBarDeleted"}>
            <div className="NoticeThumbnail">
                <img className="NoticeImg" src={process.env.PUBLIC_URL + `/thumbnail/${props.project}.png`} onError={handleImgError} alt="NoticeImg" />
            </div>
            <div className="NoticeContent">
                <div><strong>{`${props.title} - ${props.time}`}</strong></div>
                <div>{`${props.content}`}</div>
            </div>
            <img className="NoticeRemover" src={closeButtonIcon} onClick={() =>{
                deleteNotice();
                setVisible(false);
                setTimeout(() => {setExist(false)},600);
                noticeStoreObj.setNoticeNumber(noticeStoreObj.getNoticeNumber() - 1);
                }} alt="NoticeRemover" />
        </div>
    )
}

export { NoticeOutline };