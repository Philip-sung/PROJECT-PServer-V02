//External Imports
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

//Local Imports
import { userInfoStoreObj } from "../../store/userInfoStore";
import { TransitionObject } from "../TransitionObj";

//Static Imports
import "./index.css";

function ProjectOutline() {
    const [selected, setSelected] = useState("");
    const [currentTab, setCurrentTab] = useState("Info");

    return(
        <div className="ProjectContainer">
            <div className="ProjectSelectContainer">
                <div className="ProjectOutlineHeader">My Projects</div>
                <ProjectProvider>
                    <ProjectMapper selected={selected} setSelected={setSelected} />
                </ProjectProvider>
            </div>
            <div className="ProjectInfoContainer">
                <div className="ProjectInfoTab">
                    <div className={(currentTab === "Info")?"ProjectInfoTabboxSelected" : "ProjectInfoTabbox"} onClick={() => {setCurrentTab("Info")}}>Info</div>
                    <div className={(currentTab === "Schedule")?"ProjectInfoTabboxSelected" : "ProjectInfoTabbox"} onClick={() => {setCurrentTab("Schedule")}}>Schedule</div>
                </div>
                <ProjectTab tab={currentTab} project={selected} />
            </div>
        </div>
    )

}

const getUserProjectQuery = gql`
    query GetUserProject($userID: String){
        getUser(userID: $userID){
            userID
            project
        }
    }
`

function ProjectProvider({children}) {
    return(
        <div className="ProjectProvider">
            {children}
        </div>
    )
}

function ProjectMapper(props){
    const {data} = useQuery(getUserProjectQuery, {
        variables: {
            userID: userInfoStoreObj.curUser.id
        },
        fetchPolicy: 'network-only'
    })
    return(
        data?.getUser.project.map((projectName) =>(
            <ProjectSelectBox key={projectName} project={projectName} selected={props.selected} setSelected={props.setSelected} />
        ))
    )
}

function ProjectSelectBox(props) {

    const handleImgError = (e) => {
        e.target.src = process.env.PUBLIC_URL + `/thumbnail/Public.png`;
    }

    return(
        <div className={(props.selected === props.project)? "SelectedProjectSelectBox" : "ProjectSelectBox" }>
            <img className="ProjectImg" src={process.env.PUBLIC_URL + `/thumbnail/${props.project}.png`} onClick={() => {props.setSelected(props.project);}} onError={handleImgError} alt="ProjectImg" />
            {props.project}
        </div>
    )
}

const getProjectbyTitleQuery = gql`
    query GetProjectbyTitle($title: String){
        getProjectbyTitle(title: $title){
            title
            designer
            status
            funding
            started
            completed
            progress
            privilege
            link
            member
            tech
            description
            reference
        }
    }
`

function ProjectTab(props){
    if(props.tab === "Info"){
        return(<ProjectInfo project={props.project} />)
    }
    else if(props.tab === "Schedule"){
        return(<ProjectSchedule />)
    }
}

function ProjectInfo(props){
    const {data} = useQuery(getProjectbyTitleQuery, {
        variables: {
            title: props.project
        },
        fetchPolicy: 'network-only'
    })
    console.log()
    let memberList = "";
    for(let i = 0; i < data?.getProjectbyTitle?.member.length; i++){
        memberList = memberList + data.getProjectbyTitle.member[i];
        if(i < data.getProjectbyTitle.member.length - 1){
            memberList = memberList + ", ";
        }
    }

    let techList = "";
    for(let i = 0; i < data?.getProjectbyTitle?.tech.length; i++){
        techList = techList + data.getProjectbyTitle.tech[i];
        if(i < data.getProjectbyTitle.tech.length - 1){
            techList = techList + ", ";
        }
    }

    if(data !== null && data !== undefined && data?.getProjectbyTitle?.title !== undefined){
    return(
            <div className="ProjectInfo">
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Title</div><TransitionObject><div className="ProjectInfoContent">{data?.getProjectbyTitle?.title}</div></TransitionObject></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Description</div><TransitionObject><div className="ProjectInfoContent">{data?.getProjectbyTitle?.description}</div></TransitionObject></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Designer</div><TransitionObject><div className="ProjectInfoContent">{data?.getProjectbyTitle?.designer}</div></TransitionObject></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Status</div><TransitionObject><div className="ProjectInfoContent">&lt;{data?.getProjectbyTitle?.status}&gt;</div></TransitionObject></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Funding</div><TransitionObject><div className="ProjectInfoContent">&#8361; {data?.getProjectbyTitle?.funding}</div></TransitionObject></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Started</div><TransitionObject><div className="ProjectInfoContent">{data?.getProjectbyTitle?.started}</div></TransitionObject></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Complete</div><TransitionObject><div className="ProjectInfoContent">{data?.getProjectbyTitle?.completed}</div></TransitionObject></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Progress</div><TransitionObject><div className="ProjectInfoContent">{data?.getProjectbyTitle?.progress} %</div></TransitionObject></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Member</div><TransitionObject><div className="ProjectInfoContent">{memberList}</div></TransitionObject></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Tech</div><TransitionObject><div className="ProjectInfoContent">{techList}</div></TransitionObject></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Reference</div><TransitionObject><div className="ProjectInfoContent">{data?.getProjectbyTitle?.reference}</div></TransitionObject></div>                
            </div>
    )}
    else{
        return(
            <div className="ProjectInfo">
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Title</div></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Description</div></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Designer</div></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Status</div></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Funding</div></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Started</div></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Complete</div></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Progress</div></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Member</div></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Tech</div></div>
                <div className="ProjectInfoRow"><div className="ProjectInfoClass">Reference</div></div>                
            </div>

        )
    }
}

function ProjectSchedule() {
    return(
        <div className="ProjectSchedule">
            <div className="ProjectScheduleRow">
                <div><strong>[2023.03.18 13:00-19:00] Philip Sung : </strong></div>
                <div>1차 발표회(연구 결과)공유 : baio2033, irvin512</div>
            </div>
            <div className="ProjectScheduleRow">
                <div>[2023.03.18 13:00-19:00] Philip Sung</div>
                <div>1차 발표회(연구 결과)공유 : baio2033, irvin512</div>
            </div>
            <div className="ProjectScheduleRow">
                <div>[2023.03.18 13:00-19:00] Philip Sung</div>
                <div>1차 발표회(연구 결과)공유 : baio2033, irvin512</div>
            </div>
            <div className="ProjectScheduleRow">
                <div>[2023.03.18 13:00-19:00] Philip Sung</div>
                <div>1차 발표회(연구 결과)공유 : baio2033, irvin512</div>
            </div>
            <div className="ProjectScheduleRow">
                <div>[2023.03.18 13:00-19:00] Philip Sung</div>
                <div>1차 발표회(연구 결과)공유 : baio2033, irvin512</div>
            </div>
            <div className="ProjectScheduleRow">
                <div>[2023.03.18 13:00-19:00] Philip Sung</div>
                <div>1차 발표회(연구 결과)공유 : baio2033, irvin512</div>
            </div>
            <div className="ProjectScheduleRow">
                <div>[2023.03.18 13:00-19:00] Philip Sung</div>
                <div>1차 발표회(연구 결과)공유 : baio2033, irvin512</div>
            </div>
            <div className="ProjectScheduleRow">
                <div>[2023.03.18 13:00-19:00] Philip Sung</div>
                <div>1차 발표회(연구 결과)공유 : baio2033, irvin512</div>
            </div>
            <div className="ProjectScheduleRow">
                <div>[2023.03.18 13:00-19:00] Philip Sung</div>
                <div>1차 발표회(연구 결과)공유 : baio2033, irvin512</div>
            </div>
            <div className="ProjectScheduleRow">
                <div>[2023.03.18 13:00-19:00] Philip Sung</div>
                <div>1차 발표회(연구 결과)공유 : baio2033, irvin512</div>
            </div>
            <div className="ProjectScheduleRow">
                <div>[2023.03.18 13:00-19:00] Philip Sung</div>
                <div>1차 발표회(연구 결과)공유 : baio2033, irvin512</div>
            </div>
            <div className="ProjectScheduleRow">
                <div>[2023.03.18 13:00-19:00] Philip Sung</div>
                <div>1차 발표회(연구 결과)공유 : baio2033, irvin512</div>
            </div>
            <div className="ProjectScheduleRow">
                <div>[2023.03.18 13:00-19:00] Philip Sung</div>
                <div>1차 발표회(연구 결과)공유 : baio2033, irvin512</div>
            </div>
        </div>
    )
}


export { ProjectOutline }