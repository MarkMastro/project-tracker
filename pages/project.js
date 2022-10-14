import NavBar from "../components/NavBar/NavBar";
import { useRouter } from "next/router";

const Project = (props) =>{
    const {projectName, openTickets} = props.props;
    
    const router = useRouter();

    const ticketClick = (e) => {
        console.log("event", e)
        //router.push()
    }

    return(
        <div>
            <NavBar></NavBar>
            <h1>project page</h1>
            <h2>Project Name: {projectName}</h2>

            <table>
                <thead>
                    <tr>
                        <th>Ticket Name</th>
                        <th>Ticket Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {openTickets.map(ticket => {
                        return (
                        
                                <tr onClick = {()=>ticketClick(ticket.id)} key = {ticket.id}>
                                    <td>{ticket.ticket_name}</td>
                                    <td>{ticket.type}</td>
                                    <td>{ticket.ticket_description}</td>
                                </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
Project.getInitialProps = async (context) => {
    const resp = await fetch(`http://localhost:3000/api/projects/${context.query.id}`);
    const json = await resp.json();
    console.log("json", json)
    return {props: json}
}

export default Project;