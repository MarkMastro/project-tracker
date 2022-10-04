import React, { useEffect } from "react";
import styles from "./ProjectOverview.module.css";
import Link from 'next/link';

interface Props {
    id: number,
    projectName: string,
    openStories: number,
    openBugs: number

}

const openProject = () => {

}

const ProjectOverview = (props: Props) => {
    const {id, projectName, openStories, openBugs} = props;
    return (
            <Link 
                href={{
                    pathname: "/project",
                    query:{
                        id,
                        projectName,
                        openStories,
                        openBugs
                    }
                    }}>
                <div>
                    <h3>Project Name: {projectName}</h3>
                    <h4>Open Stories: {openStories}</h4>
                    <h4>Open Bugs: {openBugs}</h4>
                </div>
            </Link>

    )
        
}

export default ProjectOverview