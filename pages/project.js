import NavBar from "../components/NavBar/NavBar";
import { useRouter } from "next/router";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Project = (props) =>{
    const {projectName, openTickets} = props.props;
    
    const router = useRouter();

    const ticketClick = (ticketId) => {
        console.log("ticketId", ticketId)
        router.push(`/tickets/${ticketId}`)
    }

    return(
        <div>
            <NavBar></NavBar>
            <h1>project page</h1>
            <h2>Project Name: {projectName}</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Ticket Name</TableCell>
                        <TableCell align="right">Ticket Type</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Created On</TableCell>
                    </TableRow>
                    </TableHead>    
                    <TableBody>
                    {openTickets.map((ticket) => (
                        <TableRow
                        key={ticket.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        onClick = {()=>router.push({
                            pathname: '/ticket',
                            query: { 
                                ticketId: ticket.id,
                                ticketName: ticket.ticket_name
                            }})}
                        >
                        <TableCell component="th" scope="ticket">{ticket.ticket_name}</TableCell>
                        <TableCell align="right">{ticket.type}</TableCell>
                        <TableCell align="right">{ticket.ticket_description}</TableCell>
                        <TableCell align="right">{ticket.created_on}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
    </div>
    )
}
Project.getInitialProps = async (context) => {
    const resp = await fetch(`http://localhost:3000/api/projects/${context.query.id}`);
    const json = await resp.json();
    console.log(json)
    return {props: json}
}

export default Project;