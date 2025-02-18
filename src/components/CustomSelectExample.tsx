import {useDataStore} from "../store/useDataStore";
import CustomSelect from "../libs/custom-select/CustomSelect.tsx";

const CustomSelectExample = () => {
    const data = useDataStore(state => state.data);
    const mappedOptions = [{value: '', label: "Select your option"}]
    data.results.map(({objectId, Name}) => {
        mappedOptions.push({value: objectId, label: Name});
    })

    const handleSelectChange = (selected: { value: string; label: string }) => {
        console.log("Selected option:", selected);
    };

    return (
        <>
            <h2>Custom select example</h2>
            <CustomSelect options={mappedOptions} onChange={handleSelectChange}/>
        </>
    )
}

export default CustomSelectExample;
