import { NextApiRequest, NextApiResponse } from "next";
import queryDb from "../../../db/bin/queryDb";

const getAllProjects = async (req, res) => {
    const response = [];
    const projectIds = await queryDb(
        `SELECT id
        FROM projects;`
        );

        console.log("ids",projectIds)

    for(const projectId of projectIds){
        response.push({projectId: projectId,
            open_bugs: await queryDb(`SELECT COUNT(*) FROM bugs WHERE id = ${projectId};`), 
            open_stories: await queryDb(`SELECT COUNT(*) FROM stories WHERE id = ${projectId};`)
            })
    }

    console.log("response", response)
    res.json(response);
}

export default getAllProjects;