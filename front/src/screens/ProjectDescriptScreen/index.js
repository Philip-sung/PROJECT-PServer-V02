//External Imports
import React from "react";
import { useQuery, gql } from '@apollo/client';

function ProjectDescriptionScreen(props) {
    return (
        <div>
            <ProjectIntroduction projectID={props.projectID} />
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

function ProjectIntroduction(props) {
    const {loading, error, data} = useQuery(GetProjectbyIDQuery(props.projectID),{
        fetchPolicy:"network-only"
    });

    if(loading){
    }
    if(error){
        console.log(error.message);
    }
    console.log('ss')
    return(
        <div>
            {data}
            {data?.getProjectbyID.title}
            ss
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