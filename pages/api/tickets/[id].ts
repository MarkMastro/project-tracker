import { NextApiRequest, NextApiResponse } from "next";
import queryDb from "../../../db/bin/queryDb";
import Tickets from "../../ticket";

const getProjectTasks = async (req: NextApiRequest, res: NextApiResponse) => {

    interface TicketInfo {
        id: number,
        type: string,
        ticket_name: string,
        ticket_description: string,
        project_id: number,
        raised_by_user_id: number,
        assigned_to_user_id: number,
        created_on: string
    }
    const ticketId = req.query.id;
    const ticketInfo:[TicketInfo] = await queryDb(`SELECT * FROM tickets WHERE id = ${ticketId}`);
    const {raised_by_user_id, assigned_to_user_id} = ticketInfo[0];
    const ticketUsers = await Promise.all([
                                        queryDb(`SELECT first_name, last_name FROM users WHERE id = ${raised_by_user_id}`),
                                        queryDb(`SELECT first_name, last_name FROM users WHERE id = ${assigned_to_user_id}`)
                                    ]);

    const raised_by_user = `${ticketUsers[0][0].first_name} ${ticketUsers[0][0].last_name}`;
    const assigned_to_user = `${ticketUsers[1][0].first_name} ${ticketUsers[1][0].last_name}`;

    res.json({raised_by_user, assigned_to_user, ...ticketInfo[0]});
}

export default getProjectTasks;