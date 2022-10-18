import NavBar from "../components/NavBar/NavBar";
import { useRouter } from "next/router";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetServerSideProps } from "next";
import queryDb from "../db/bin/queryDb";

interface TicketProps {
    projectName:string, 
    openTickets:Ticket[]
}

interface Ticket{
    id: number, 
    type: string,
    ticket_name: string, 
    ticket_description: string,
    project_id: number,
    raised_by_user_id: string,
    assigned_to_user_id: string,
    created_on: string
}

const Project = (props: TicketProps) =>{
    const {projectName, openTickets} = props;
    
    const router = useRouter();

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
                        style={{cursor: 'pointer'}}
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
export const getServerSideProps: GetServerSideProps<TicketProps> = async ctx => {

    const projectId:string = ctx.query.id! as string;
    const projectName:string = ctx.query.projectName! as string;

    const results:Ticket[] = await queryDb(`SELECT * FROM tickets WHERE project_id = ${projectId} ORDER BY created_on DESC;`);
    console.log("results", results)
    return {
        props: {
            "projectName": projectName, "openTickets": JSON.parse(JSON.stringify(results))
        }
    }
}


export default Project;