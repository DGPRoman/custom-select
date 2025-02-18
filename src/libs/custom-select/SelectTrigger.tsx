import React from "react";
import {Option} from "./types.ts";

interface SelectTriggerProps {
    isOpen: boolean;
    onClick: () => void;
    selectedOption: Option | null;
}

const SelectTrigger: React.FC<SelectTriggerProps> = ({
                                                         isOpen,
                                                         onClick,
                                                         selectedOption,
                                                     }) => (
    <div
        className={`select-trigger ${isOpen ? "opened" : "closed"}`}
        onClick={onClick}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={0}
    >
        {selectedOption ? selectedOption.label : ''}
    </div>
);

export default SelectTrigger;
