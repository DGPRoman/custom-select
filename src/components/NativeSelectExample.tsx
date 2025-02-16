import {useDataStore} from "../store/useDataStore.ts";

const NativeSelectExample = () => {
    const data= useDataStore(state => state.data);

    return (
        <>
            <h2>Native select example</h2>
            <select name="native" id="native_select">
                <option value="">Select your option</option>
                {data.results?.map((item) => (
                    <option value={item.objectId}>{item.Name}</option>
                ))}
            </select>
        </>
    )
}

export default NativeSelectExample;
