import NavBar from "../components/NavBar/NavBar";
import ProjectOverview from "../components/ProjectOverview/ProjectOverview";

interface Props {

}
//query database for open projects (id, name, openbugs, openstories) pass to each projectOverview card
const LandingPage = (props: Props) => {
    return(
        <div>
            <NavBar></NavBar>
            <ProjectOverview></ProjectOverview>
            <ProjectOverview></ProjectOverview>
            <ProjectOverview></ProjectOverview>


        </div>
    )
}

export default LandingPage;