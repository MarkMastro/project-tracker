import NavBar from "../components/NavBar/NavBar"

interface Props{
    props:{
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

}

interface TicketContext {
    query: {
        ticketId: number,
        ticketName: string
    }
}

const Tickets = (props: Props) =>{
    console.log("ticket", props)
    const {id, type, ticket_name, ticket_description, project_id, raised_by_user, assigned_to_user, created_on} = props.props;
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

Tickets.getInitialProps = async (context: TicketContext) => {
    const resp = await fetch(`http://localhost:3000/api/tickets/${context.query.ticketId}`);
    const json = await resp.json();
    return {props: {...json, ticketName: context.query.ticketName}}
}


export default Tickets;