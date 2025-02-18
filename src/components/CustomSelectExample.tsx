import {useDataStore} from "../store/useDataStore";
import CustomSelect from "../libs/custom-select/CustomSelect.tsx";
import {Option} from "../libs/custom-select/types.ts";

/**
 * Example component demonstrating the use of CustomSelect with data from the store.
 */
const CustomSelectExample = () => {
    const data = useDataStore(state => state.data);

    const handleSelectChange = (selected: Option) => {
        console.log("Selected option:", selected);
    };

    return (
        <>
            <h1>Custom Select Example</h1>
            <CustomSelect options={data} onChange={handleSelectChange}/>
        </>
    );
};

export default CustomSelectExample;
