import {Option} from "./types.ts";

const SelectTrigger = ({
                           isOpen,
                           onClick,
                           selectedOption,
                           placeholder,
                       }: {
    isOpen: boolean;
    onClick: () => void;
    selectedOption: Option | null;
    placeholder: string;
}) => (
    <div
        className={`select-trigger ${isOpen ? "opened" : "closed"}`}
        onClick={onClick}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={0}
    >
        {selectedOption ? selectedOption.label : placeholder}
    </div>
);

export default SelectTrigger;
