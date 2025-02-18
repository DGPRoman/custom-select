import React from "react";
import {Virtualizer} from "@tanstack/react-virtual";
import SimpleBar from "simplebar-react";
import {Option, SimpleBarWithScrollElement} from "./types.ts";
import "simplebar-react/dist/simplebar.min.css";

interface DropdownListProps {
    options: Option[];
    highlightedIndex: number | null;
    onOptionClick: (index: number) => void;
    onMouseEnter: (index: number) => void;
    rowVirtualizer: Virtualizer<HTMLElement, Element>;
    simpleBarRef: React.RefObject<SimpleBarWithScrollElement | null>;
}

/**
 * Renders a dropdown list with virtualization
 */
const DropdownList: React.FC<DropdownListProps> = ({
                                                       options,
                                                       highlightedIndex,
                                                       onOptionClick,
                                                       onMouseEnter,
                                                       rowVirtualizer,
                                                       simpleBarRef,
                                                   }) => {
    return (
        <div className="dropdown">
            <SimpleBar style={{maxHeight: 200}} ref={simpleBarRef} autoHide={false}>
                <ul
                    className="dropdown-list"
                    role="listbox"
                    style={{height: `${rowVirtualizer.getTotalSize()}px`}}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const option = options[virtualRow.index];
                        return (
                            <li
                                key={`option-key-${option.value}`}
                                className={`dropdown-item ${highlightedIndex === virtualRow.index ? 'highlighted' : ''}`}
                                onClick={() => onOptionClick(virtualRow.index)}
                                onMouseEnter={() => onMouseEnter(virtualRow.index)}
                                role="option"
                                style={{
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                            >
                                {option.label}
                            </li>
                        );
                    })}
                </ul>
            </SimpleBar>
        </div>
    );
};

export default DropdownList;
