import {useEffect} from "react";
import {useDataStore} from "./store/useDataStore";
import CustomSelectExample from "./components/CustomSelectExample.tsx";


function App() {
    const fetchData = useDataStore(state => state.fetchData);

    useEffect(() => {
        fetchData().catch(error => console.error("Fetch error:", error));
    }, [fetchData]);

    return (
        <CustomSelectExample/>
    )
}

export default App;
