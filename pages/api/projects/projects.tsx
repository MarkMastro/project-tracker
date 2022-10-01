import { resolveSoa } from "dns";
import { NextApiRequest, NextApiResponse } from "next";

const getAllProjects = (req: NextApiRequest, res: NextApiResponse) => {
    res.json({hello: 'world', method: req.method});
}

export default getAllProjects;