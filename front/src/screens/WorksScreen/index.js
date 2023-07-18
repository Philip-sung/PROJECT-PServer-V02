//External Imports
import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

//Local Imports
import { Displayer, DisplayerContainer } from "../../components/Displayer";
import { TransitionObject } from "../../components/TransitionObj";

//Static Imports
import "./index.css";

function WorksScreen() {

    
    return (
        <div className="WorkScreen">
            <TransitionObject>
                <div style={{margin: 10, fontWeight: 700}}>COMPLETED</div>
            </TransitionObject>
            <DisplayerContainer>
                <DisplayerWorkMap />
            </DisplayerContainer>
        </div>
    )
}

const GetCompletedProjects = gql`
query GetProjectsbyStatus($status: String) {
    getProjectsbyStatus(status: $status) {
        _id
        title
        status
        thumbnail
        description
    }
}
`

function DisplayerWorkMap() {
const {data} = useQuery(GetCompletedProjects,{
    variables: {
        status: "Completed"
    },
    fetchPolicy: 'network-only'
})
return(
    data?.getProjectsbyStatus.map(({_id, title, thumbnail,description}) => (
        <Displayer 
            key={_id}
            name={`[${title}]${description}`}
            img={thumbnail}
            action={"useFunction"}
            function={
                () => {alert("Hello")}
            } />
    ))
)
}



export { WorksScreen }