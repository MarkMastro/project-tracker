import NavBar from "../components/NavBar/NavBar"



const Bugs = (props) =>{
    console.log("bug props", props)
return(
    <div>
        <NavBar></NavBar>
    <h1>Bug page</h1>

    </div>
)
}

export async function getServerSideProps  (context) {
    const resp = await fetch(`http://localhost:3000/api/bugs/${context.query.id}`);
    const json = await resp.json();
    console.log("bug json", json)
    return {props: {...json, bugName: context.query.bugName}}
}


export default Bugs;