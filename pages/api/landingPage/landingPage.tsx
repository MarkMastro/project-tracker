import { NextApiRequest, NextApiResponse } from "next";
import queryDb from "../../../db/bin/queryDb";

const getAllProjects = async (req: NextApiRequest, res: NextApiResponse) => {
    const projectResponse = await queryDb("SELECT * FROM projects;")
    console.log("proj", projectResponse)
    res.json(projectResponse);
}

export default getAllProjects;