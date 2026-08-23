import Sidebar from "../components/Sidebar";
import Tasks from "../components/Tasks";
import { AlertProvider } from "../context/AlertProvider";

import "./Home.scss";

const Home = () => {
    return (
        <AlertProvider>
            <div className="home-container">
                <Sidebar />
                <Tasks />
            </div>
        </AlertProvider>
    );
};

export default Home;
