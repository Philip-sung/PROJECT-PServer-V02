//Static Imports
import "./index.css";

function ProjectOutline() {
    return(
        <div className="ProjectContainer">
            <div className="ProjectSelectContainer">
                <div className="ProjectOutlineHeader">My Projects</div>
                <ProjectProvider>
                    <ProjectSelectBox />
                    <ProjectSelectBox />
                    <ProjectSelectBox />
                    <ProjectSelectBox />
                    <ProjectSelectBox />
                    <ProjectSelectBox />
                    <ProjectSelectBox />
                    <ProjectSelectBox />
                    <ProjectSelectBox />
                    <ProjectSelectBox />
                    <ProjectSelectBox />
                    <ProjectSelectBox />
                    <ProjectSelectBox />
                </ProjectProvider>
            </div>
            <div className="ProjectInfoContainer">
                <div className="Header">Project Information</div>
                <div className="ProjectInfo"><br/></div>
            </div>
        </div>
    )

}

function ProjectProvider({children}) {
    return(
        <div className="ProjectProvider">
            {children}
        </div>
    )
}

function ProjectSelectBox() {
    return(
        <div className="ProjectSelectBox">
            
        </div>
    )
}

export { ProjectOutline }