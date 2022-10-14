import { NextApiRequest, NextApiResponse } from "next";
import queryDb from "../../../db/bin/queryDb";

const getAllProjects = async (req, res) => {
    const response = [];
    const projects = await queryDb(
        `SELECT id, project_name
        FROM projects;`
        );

    for(const project of projects){
        let openBugCount = 0;
        let openFeatureCount = 0;

        const results = await queryDb(`SELECT * FROM tickets INNER JOIN projects on tickets.project_id = projects.id WHERE projects.id = ${project.id};`);

        for(const result of results) {
            if(result.type === 'Bug'){
                openBugCount++;
            } else if (result.type === 'Feature'){
                openFeatureCount++;
            }
        }

        response.push(
            {
            id: project.id,
            project_name: project.project_name,
            openBugCount, 
            openFeatureCount
            })
    }

    res.json(response);
}

export default getAllProjects;