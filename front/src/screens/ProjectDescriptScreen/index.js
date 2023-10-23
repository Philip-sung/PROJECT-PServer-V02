//External Imports
import React from "react";
import { useQuery, gql } from '@apollo/client';
import { TransitionObject } from "../../components/TransitionObj";
import { Displayer, DisplayerContainer } from "../../components/Displayer";

function ProjectDescriptionScreen(props) {
    return (
        <div>
            <TransitionObject>
                <ProjectIntroduction projectID={props.projectID} />
                <SubProjectContainer />
            </TransitionObject>
        </div>
    )
}

function GetProjectbyIDQuery(ProjectIdString) {
    const ProjectID = ProjectIdString;

    return(
        gql`
        query GetProjectbyID {
            getProjectbyID(projectID: "${ProjectID}"){
                _id
                title
                designer
                status
                thumbnail
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
    `)
}

function ProjectIntroduction(props) {
    console.log(props.projectID)
    const {loading, error, data} = useQuery(GetProjectbyIDQuery(props.projectID),{
        fetchPolicy:"network-only"
    });

    if(loading){
    }
    if(error){
        console.log(error.message);
    }
    return(
        <div style={{textAlign:'left', fontSize: 15, margin:10}}>
            Project Title : {data?.getProjectbyID.title}<br />
            Project Description : {data?.getProjectbyID.description}<br />
            Project Designer : {data?.getProjectbyID.designer}<br />
            Project Status : {data?.getProjectbyID.status}<br />
        </div>
    )
}

function SubProjectContainer() {
    return(
        <DisplayerContainer>
            <Displayer 
                name={"2DCanvas"}
                img={"2DCanvas"}
                action={"Link"}
                LinkTo={"2DCanvasParticle"} 
            />
        </DisplayerContainer>
    )
}


export { ProjectDescriptionScreen }