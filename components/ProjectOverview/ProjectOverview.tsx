import React, { useEffect } from "react";
import styles from "./ProjectOverview.module.css";
import Link from 'next/link';

interface Props {
    key: number,
    id: number,
    projectName: string,
    openFeatureCount: number,
    openBugCount: number

}

const openProject = () => {

}

const ProjectOverview = (props: Props) => {
    const {key, id, projectName, openFeatureCount, openBugCount} = props;
    return (
            <Link 
                key = {id}
                href={{
                    pathname: "/project",
                    query:{
                        key,
                        id,
                        projectName,
                        openFeatureCount,
                        openBugCount
                    }
                    }}>
                <div>
                    <h3>Project Name: {projectName}</h3>
                    <h4>Open Features: {openFeatureCount}</h4>
                    <h4>Open Bugs: {openBugCount}</h4>
                </div>
            </Link>

    )
        
}

export default ProjectOverview