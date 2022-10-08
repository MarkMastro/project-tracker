import NavBar from "../components/NavBar/NavBar";
import ProjectOverview from "../components/ProjectOverview/ProjectOverview";
import fetch from 'isomorphic-unfetch';
// interface ProjectProps {
//     id: string,
//     projectName: string,
//     openStories: string,
//     openBugs: string
// }
//query database for open projects (id, name, openbugs, openstories) pass to each projectOverview card
const LandingPage = ({projects}) => {

    return(
        <div>
           {
            projects.map(project =>  {
                return (
                    <div>
                    <ProjectOverview 
                        key={project.id}    
                        id={project.id} 
                        projectName = {project.project_name} 
                        openStories = {project.open_stories} 
                        openBugs = {project.open_bugs}
                        />
                        <hr></hr>
                        </div>
                    )

            })
           }

        </div>
    )
}

LandingPage.getInitialProps = async () => {
    const resp = await fetch('http://localhost:3000/api/landingPage/landingPage');
    const json = await resp.json();
    console.log("projects", json)
    return {projects: json}
}

export default LandingPage;