//External Imports
import React from "react";
import { useQuery, gql } from '@apollo/client';

function ProjectDescriptionScreen(props) {
    return (
        <div>
            <ProjectIntroduction />
            <SubProjectContainer />
            {props.projectID}
        </div>
    )
}

function GetProjectbyIDQuery(ProjectIdString) {
    const ProjectID = ProjectIdString;

    return(
        gql`
        query GetProjectbyID {
            getProjectbyID(ProjectID: "${ProjectID}"){
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

function ProjectIntroduction() {
    const {loading, error, data} = useQuery(GeProjectbyIDQuery(props.projectID),{
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