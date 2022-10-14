import { NextApiRequest, NextApiResponse } from "next";
import queryDb from "../../../db/bin/queryDb";

const getProjectTasks = async (req: NextApiRequest, res: NextApiResponse) => {
    const projectId = req.query.id;
    const results = await queryDb(`SELECT * FROM tickets WHERE project_id = ${projectId} ORDER BY created_on DESC;`);

    res.json({"projectId": projectId, "openTickets": results});
}

export default getProjectTasks;