import { useDataStore } from "../store/useDataStore";

const CustomSelectExample = () => {
    const data= useDataStore(state => state.data);

    return (
        <>
            <h2>Custom select example</h2>
            <div>Select your option</div>
            <ul>
                {data.results?.map((item) => (
                    <li key={item.objectId}>{item.Name}</li>
                ))}
            </ul>
        </>
    )
}

export default CustomSelectExample;
