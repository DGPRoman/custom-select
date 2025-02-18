import {useEffect} from "react";
import {useDataStore} from "./store/useDataStore";
import CustomSelectExample from "./components/CustomSelectExample.tsx";
import CustomSelectLoadTest from "./components/CustomSelectLoadTest.tsx";

/**
 * Main application component that initializes data fetching on mount.
 */
function App() {
    const fetchData = useDataStore(state => state.fetchData);

    useEffect(() => {
        fetchData().catch(error => console.error("Fetch error:", error));
    }, [fetchData]);

    return (
        <>
            <CustomSelectExample/>
            <CustomSelectLoadTest optionsCount={234567}/>
        </>
    )
}

export default App;
