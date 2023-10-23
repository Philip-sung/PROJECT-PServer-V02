//External Imports
import React from "react";
import { useQuery, gql } from '@apollo/client';

function ProjectDescriptionScreen(props) {
    return (
        <div>
            <ProjectIntroduction projectID={props.projectID} />
            <SubProjectContainer />
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
        <div>
            {data?.getProjectbyID.title}
        </div>
    )
}

function SubProjectContainer() {
    return(
        <div>
            SubProjectContainer
        </div>
    )
}


export { ProjectDescriptionScreen }