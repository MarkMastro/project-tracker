import NavBar from "../components/NavBar/NavBar";
import Link from "next/link";

const Project = (props) =>{
    const {projectName, openBugs, openStories} = props;
    return(
        <div>
            <NavBar></NavBar>
            <h1>project page</h1>
            <h2>Project Name: {projectName}</h2>

            <table>
                <tr>
                    <th>Ticket Name</th>
                    <th>Ticket Type</th>
                    <th>Description</th>
                </tr>
                {openBugs.map(bug => {
                    return (
                        <Link
                        href={{
                            pathname: "/bug",
                            query:{
                                id: bug.id,
                                bugName: bug.bug_name,
                                bugDescription: bug.bug_description
                            }
                            }}
                            >
                            <tr>
                                <td>{bug.bug_name}</td>
                                <td>Bug</td>
                                <td>{bug.bug_description}</td>

                            </tr>
                        </Link>
                    )
                })}
                {openStories.map(story => {
                    return (
                        <Link
                        href={{
                            pathname: "/story",
                            query:{
                                id: story.id,
                                storyName: story.story_name,
                                storyDescription: story.story_description
                            }
                            }}>
                        
                            
                            <tr>
                                <td>{story.story_name}</td>
                                <td>Story</td>
                                <td>{story.story_description}</td>

                            </tr>
                        </Link>
                    )
                })}
                
            </table>
        </div>
    )
}
export async function getServerSideProps  (context) {
    const resp = await fetch(`http://localhost:3000/api/projects/${context.query.id}`);
    const json = await resp.json();
    return {props: {...json, projectName: context.query.projectName}}
}

export default Project;