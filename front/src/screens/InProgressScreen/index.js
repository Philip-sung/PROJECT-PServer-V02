//External Imports
import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

//Local Imports
import { Displayer, DisplayerContainer } from "../../components/Displayer";
import { TransitionObject } from "../../components/TransitionObj";

//Static Imports
import "./index.css"

function InProgressScreen() {

    
    return (
        <div className="InProgressScreen">
            <TransitionObject>
                <div style={{margin: 10, fontWeight: 700}}>IN PROGRESS</div>
            </TransitionObject>
            <DisplayerContainer>
                <Displayer name={"ADD NEW PROJECT"} img={"add"} action={"Link"} LinkTo={"addProject"} />
                <DisplayerWorkMap />
            </DisplayerContainer>
        </div>
    )
}

const GetInProgressProjects = gql`
    query GetProjectsbyStatus($status: String) {
        getProjectsbyStatus(status: $status) {
            _id
            title
            status
            thumbnail
        }
    }
`

function DisplayerWorkMap() {
    const {data} = useQuery(GetInProgressProjects,{
        variables: {
            status: "inProgress"
        },
        fetchPolicy: 'network-only'
    })
    return(
        data?.getProjectsbyStatus.map(({_id, title, thumbnail}) => (
            <Displayer 
                key={_id}
                name={`[${title}]`}
                img={thumbnail}
                action={"useFunction"}
                function={
                    () => {alert("Hello")}
                } />
        ))
    )
}

export { InProgressScreen }