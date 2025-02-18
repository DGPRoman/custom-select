import {Virtualizer} from "@tanstack/react-virtual";
import React from "react";
import SimpleBar from "simplebar-react";
import {Option} from "../../types/data.ts";


const DropdownList = ({
                          options,
                          highlightedIndex,
                          onOptionClick,
                          onMouseEnter,
                          rowVirtualizer,
                          simpleBarRef,
                      }: {
    options: Option[];
    highlightedIndex: number | null;
    onOptionClick: (index: number) => void;
    onMouseEnter: (index: number) => void;
    rowVirtualizer: Virtualizer<any, Element>;
    simpleBarRef: React.RefObject<typeof SimpleBar | null>;
}) => (
    <div className="dropdown">
        <SimpleBar style={{maxHeight: 200}}
                   ref={simpleBarRef}
                   autoHide={false}>
            <ul
                className="dropdown-list"
                role="listbox"
                style={{height: rowVirtualizer.getTotalSize()}}
            >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const option = options[virtualRow.index];
                    return (
                        <li
                            key={`select-key-${option.value}`}
                            className={`dropdown-item ${
                                highlightedIndex === virtualRow.index ? "highlighted" : ""
                            }`}
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

export default DropdownList;