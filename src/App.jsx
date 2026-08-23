import { AlertProvider } from "./context/AlertProvider";
import Tasks from "./components/Tasks";

const App = () => {
    return (
        <AlertProvider>
            <Tasks />
        </AlertProvider>
    );
};

export default App;
