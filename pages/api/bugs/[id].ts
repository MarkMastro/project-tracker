import { resolveSoa } from "dns";
import { NextApiRequest, NextApiResponse } from "next";
import queryDb from "../../../db/bin/queryDb";

const getProjectTasks = async (req: NextApiRequest, res: NextApiResponse) => {
    const bugId = req.query.id;


    const results = await queryDb(`SELECT * FROM bugs WHERE id = ${bugId};`)
    
    res.json({"bugId": bugId, "results": [...results] });
}

export default getProjectTasks;