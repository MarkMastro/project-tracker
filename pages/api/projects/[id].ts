import { resolveSoa } from "dns";
import { NextApiRequest, NextApiResponse } from "next";
import queryDb from "../../../db/bin/queryDb";

const getProjectTasks = async (req: NextApiRequest, res: NextApiResponse) => {
    const projectId = req.query.id;


        const results = await Promise.all([
                                    queryDb(`SELECT * FROM bugs WHERE project_id = ${projectId};`), 
                                    queryDb(`SELECT * FROM stories WHERE project_id = ${projectId};`)
                                        ]);
    res.json({"projectId": projectId, "openBugs": results[0], "openStories": results[1] });
}

export default getProjectTasks;