import NavBar from "../components/NavBar/NavBar"
import queryDb from "../db/bin/queryDb";

import {GetServerSideProps} from "next";
import { parse } from "path";

interface Props{
    id: number,
    type: string,
    ticket_name: string,
    ticket_description: string,
    project_id: number,
    raised_by_user_id: number,
    raised_by_user: string,
    assigned_to_user_id: number,
    assigned_to_user: string,
    created_on: string

}

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

interface TicketContext {
    query: {
        ticketId: number,
        ticketName: string
    }
}

const Tickets = (props: Props) =>{
    console.log("ticket", props)
    const {id, type, ticket_name, ticket_description, project_id, raised_by_user, assigned_to_user, created_on} = props;
return(
    <div>
        <NavBar></NavBar>
        <h1>Ticket page</h1>
        <h4>Ticket ID: {id}</h4>
        <h4>Ticket type: {type}</h4>
        <h4>Ticket Ticket Name: {ticket_name}</h4>
        <h4>Ticket Ticket Description: {ticket_description}</h4>
        <h4>Ticket Project ID: {project_id}</h4>
        <h4>Ticket raised by: {raised_by_user}</h4>
        <h4>Ticket assigned to: {assigned_to_user}</h4>
        <h4>Ticket created on: {created_on}</h4>

    </div>
)
}

export const getServerSideProps:GetServerSideProps = async ctx => {
    const ticketId:string = ctx.query.ticketId! as string;

    let ticketInfo:TicketInfo[] = await queryDb(`SELECT * FROM tickets WHERE id = ${ticketId}`);
    const {id, type, ticket_name, ticket_description, project_id, raised_by_user_id, assigned_to_user_id, created_on}  = ticketInfo[0];
    const ticketUsers = await Promise.all([
                                        queryDb(`SELECT first_name, last_name FROM users WHERE id = ${raised_by_user_id}`),
                                        queryDb(`SELECT first_name, last_name FROM users WHERE id = ${assigned_to_user_id}`)
                                    ]);

    const raised_by_user = `${ticketUsers[0][0].first_name} ${ticketUsers[0][0].last_name}`;
    const assigned_to_user = `${ticketUsers[1][0].first_name} ${ticketUsers[1][0].last_name}`;

    return {
        props: {
            id, 
            type,
            ticket_name,
            ticket_description,
            project_id,
            raised_by_user,
            assigned_to_user,
            created_on: JSON.stringify(created_on).split("T")[0].substring(1)
        }
    }
}



export default Tickets;