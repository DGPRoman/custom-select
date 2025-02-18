import React, {useState, useRef, useEffect, useCallback} from "react";
import {useVirtualizer} from "@tanstack/react-virtual";
import SimpleBar from "simplebar-react";
import DropdownList from "./DropdownList.tsx";
import "./select-styles.css";
import "simplebar-react/dist/simplebar.min.css";
import SelectTrigger from "./SelectTrigger.tsx";
import {Option} from "./types.ts";
import {useKeyboardNavigation} from "./useKeyboardNavigation.tsx";
import {useDropdownHandlers} from "./useDropdownHandlers.tsx";

interface SimpleBarWithScrollElement {
    getScrollElement: () => HTMLElement;
}

interface SelectProps {
    options: Option[];
    onChange?: (selected: Option) => void;
    placeholder?: string;
}

const CustomSelect: React.FC<SelectProps> = ({options, onChange, placeholder = "Select your option"}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
    const [isFocused, setIsFocused] = useState(false);

    const selectRef = useRef<HTMLDivElement>(null);
    const simpleBarRef = useRef<typeof SimpleBar & SimpleBarWithScrollElement>(null);

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);


    const rowVirtualizer = useVirtualizer({
        count: options.length,
        getScrollElement: () => simpleBarRef.current?.getScrollElement() ?? null,
        estimateSize: () => 36,
    });

    const handleOptionClick = (index: number) => {
        setSelectedIndex(index);
        if (onChange) {
            onChange(options[index]);
        }
        closeDropdown();
    };

    const {toggleDropdown, closeDropdown, handleMouseEnter} = useDropdownHandlers({
        setIsOpen,
        setHighlightedIndex,
    });

    const handleKeyDown = useKeyboardNavigation({
        isOpen,
        highlightedIndex,
        options,
        rowVirtualizer,
        handleOptionClick,
        setHighlightedIndex,
        closeDropdown,
        setIsOpen
    });

    useEffect(() => {
        if (isOpen) {
            rowVirtualizer.measure();
        }
    }, [isOpen, rowVirtualizer]);

    useEffect(() => {
        const handleKeyDownWithFocus = (e: KeyboardEvent) => {
            if (isFocused) {
                handleKeyDown(e);
            }
        };

        if (isFocused) {
            document.addEventListener("keydown", handleKeyDownWithFocus);
        } else {
            document.removeEventListener("keydown", handleKeyDownWithFocus);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDownWithFocus);
        };
    }, [isFocused, handleKeyDown]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                closeDropdown();
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [closeDropdown]);

    useEffect(() => {
        if (isOpen) {
            setHighlightedIndex(selectedIndex ?? 0);
        }
    }, [isOpen, selectedIndex]);

    const selectedOption = selectedIndex !== null ? options[selectedIndex] : null;

    return (
        <div className="select-container" ref={selectRef} onFocus={handleFocus} onBlur={handleBlur}>
            <SelectTrigger
                isOpen={isOpen}
                onClick={toggleDropdown}
                selectedOption={selectedOption}
                placeholder={placeholder}
            />
            {isOpen && (
                <DropdownList
                    options={options}
                    highlightedIndex={highlightedIndex}
                    onOptionClick={handleOptionClick}
                    onMouseEnter={handleMouseEnter}
                    rowVirtualizer={rowVirtualizer}
                    simpleBarRef={simpleBarRef}
                />
            )}
        </div>
    );
};

export default CustomSelect;
