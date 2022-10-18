import NavBar from "../components/NavBar/NavBar";
import ProjectOverview from "../components/ProjectOverview/ProjectOverview";
import { GetServerSideProps } from "next";
import queryDb from "../db/bin/queryDb";
import fetch from 'isomorphic-unfetch';


interface Props{
    projects: Project[];
}

interface Project{
    id: number,
    project_name: string,
    openBugCount: number, 
    openFeatureCount: number
}

const LandingPage = (props: Props) => {

    const {projects} = props;
    return(
        <div>
           {
            projects.map(project =>  {
                return (
                    <ProjectOverview 
                        id={project.id} 
                        projectName = {project.project_name} 
                        openFeatureCount = {project.openFeatureCount} 
                        openBugCount = {project.openBugCount}
                        />
                    )

            })
           }

        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const projects = [];
    const projectsInfo= await queryDb(
        `SELECT id, project_name
        FROM projects;`
        );
        
    for(const projectInfo of projectsInfo){
        let openBugCount = 0;
        let openFeatureCount = 0;

        const results = await queryDb(`SELECT * FROM tickets INNER JOIN projects on tickets.project_id = projects.id WHERE projects.id = ${projectInfo.id};`);

        for(const result of results) {
            if(result.type === 'Bug'){
                openBugCount++;
            } else if (result.type === 'Feature'){
                openFeatureCount++;
            }
        }

        projects.push(
            {
            id: projectInfo.id,
            project_name: projectInfo.project_name,
            openBugCount, 
            openFeatureCount
            })
    }
    return {props: {projects}}
}



export default LandingPage;