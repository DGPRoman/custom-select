import {useEffect} from "react";
import './App.css';
import { useDataStore } from "./store/useDataStore";
import CustomSelectExample from "./components/CustomSelectExample.tsx";
import NativeSelectExample from "./components/NativeSelectExample.tsx";


function App() {
    const fetchData = useDataStore(state => state.fetchData);

    useEffect(() => {
        fetchData().catch(error => console.error("Fetch error:", error));
    }, [fetchData]);

    return (
        <>
            <CustomSelectExample />
            <NativeSelectExample />
        </>
    )
}

export default App
