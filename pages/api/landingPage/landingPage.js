import { NextApiRequest, NextApiResponse } from "next";
import queryDb from "../../../db/bin/queryDb";

const getAllProjects = async (req, res) => {
    const response = [];
    const projects = await queryDb(
        `SELECT id, project_name
        FROM projects;`
        );

    for(const project of projects){
        console.log("project id",project.id)
        const results = await Promise.all([
                                    queryDb(`SELECT COUNT(*) FROM bugs INNER JOIN projects on bugs.project_id = projects.id WHERE projects.id = ${project.id};`), 
                                    queryDb(`SELECT COUNT(*) FROM stories INNER JOIN projects on stories.project_id = projects.id WHERE projects.id = ${project.id};`)
                                        ]);
        response.push(
            {
            id: project.id,
            project_name: project.project_name,
            open_bugs: results[0][0].count, 
            open_stories: results[1][0].count
            })
    }

    console.log("response", response)
    res.json(response);
}

export default getAllProjects;