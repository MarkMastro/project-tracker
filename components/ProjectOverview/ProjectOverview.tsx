import React, { useEffect } from "react";
import styles from "./ProjectOverview.module.css";
import Link from 'next/link';

interface Props {
    id: number,
    projectName: string,
    openFeatureCount: number,
    openBugCount: number

}

const openProject = () => {

}

const ProjectOverview = (props: Props) => {
    const {id, projectName, openFeatureCount, openBugCount} = props;
    return (
            <Link 
                key={id}
                href={{
                    pathname: "/project",
                    query:{
                        id,
                        projectName,
                        openFeatureCount,
                        openBugCount
                    }
                    }}>
                
                <div style={{cursor: 'pointer'}}>
                    <h3>Project Name: {projectName}</h3>
                    <h4>Open Features: {openFeatureCount}</h4>
                    <h4>Open Bugs: {openBugCount}</h4>
                    <hr></hr>
                </div>
            </Link>

    )
        
}

export default ProjectOverview