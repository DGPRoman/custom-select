import CustomSelect from "../libs/custom-select/CustomSelect.tsx";
import {Option} from "../libs/custom-select/types.ts";

/**
 * Test component with generated data.
 */
const CustomSelectLoadText = ({optionsCount}:{optionsCount: number}) => {
    function generateOptions(): Option[] {
        return Array.from({length: optionsCount}, (_, i) => ({
            value: i.toString(),
            label: `Option ${i + 1}`
        }));
    }

    const data = generateOptions();

    const handleSelectChange = (selected: Option) => {
        console.log("Selected option:", selected);
    };

    return (
        <>
            <h2>{optionsCount} Options Test</h2>
            <CustomSelect options={data} onChange={handleSelectChange}/>
        </>
    );
};

export default CustomSelectLoadText;
