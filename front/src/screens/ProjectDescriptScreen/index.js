//External Imports
import React from "react";
import { useQuery, gql } from '@apollo/client';
import { TransitionObject } from "../../components/TransitionObj";
import { Displayer, DisplayerContainer } from "../../components/Displayer";

function ProjectDescriptionScreen(props) {
    return (
        <div style={{display:"flex", justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
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
        <div style={{display:'flex', textAlign:'left', fontSize: 15, margin:10, flexDirection:'row'}}>
            <div style={{marginRight:40, fontWeight:'600'}}>
                Project Title : <br />
                Project Status :<br />
                Project Leader : <br />
                Description : <br />
            </div>
            <div>
                {data?.getProjectbyID.title}<br />
                {data?.getProjectbyID.status}<br />
                {data?.getProjectbyID.designer}<br />
                {data?.getProjectbyID.description}<br />
            </div>
        </div>
    )
}

function SubProjectContainer() {
    return(
        <DisplayerContainer>
            <Displayer 
                name={"[SubProject] : Particle"}
                img={"2DCanvas"}
                action={"GetProjectName"}
                LinkTo={"2DCanvasParticle"} 
            />
            <Displayer 
                name={"[SubProject] : Particle"}
                img={"2DCanvas"}
                action={"GetProjectName"}
                LinkTo={"2DCanvasParticle"} 
            />
            <Displayer 
                name={"[SubProject] : Particle"}
                img={"2DCanvas"}
                action={"GetProjectName"}
                LinkTo={"2DCanvasParticle"} 
            />
        </DisplayerContainer>
    )
}


export { ProjectDescriptionScreen }