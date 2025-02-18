import React from "react";
import {Option} from "./types.ts";

interface SelectTriggerProps {
    isOpen: boolean;
    onClick: () => void;
    selectedOption: Option | null;
    placeholder: string;
}

const SelectTrigger: React.FC<SelectTriggerProps> = ({
                                                         isOpen,
                                                         onClick,
                                                         selectedOption,
                                                         placeholder,
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
