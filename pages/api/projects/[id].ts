import { resolveSoa } from "dns";
import { NextApiRequest, NextApiResponse } from "next";

const getProjectById = (req: NextApiRequest, res: NextApiResponse) => {
    res.json({byId: req.query.id, message: "getVehiclebyID"});
}

export default getProjectById;