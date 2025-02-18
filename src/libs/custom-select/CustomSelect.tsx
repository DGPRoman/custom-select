import React, {useState, useRef, useEffect, useCallback} from "react";
import {useVirtualizer} from "@tanstack/react-virtual";
import DropdownList from "./DropdownList.tsx";
import SelectTrigger from "./SelectTrigger.tsx";
import {Option} from "./types.ts";
import {useKeyboardNavigation} from "./useKeyboardNavigation.tsx";
import {useDropdownHandlers} from "./useDropdownHandlers.tsx";
import {SimpleBarWithScrollElement} from "./types.ts";
import "./select-styles.css";

interface SelectProps {
    options: Option[];
    onChange?: (selected: Option) => void;
    selected?: Option;
}

/**
 * A custom select component that supports virtualization for performance with large lists.
 */
const CustomSelect: React.FC<SelectProps> = ({options, onChange, selected}: SelectProps): React.ReactElement => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
    const [isFocused, setIsFocused] = useState(false);

    const selectRef = useRef<HTMLDivElement>(null);
    const simpleBarRef = useRef<SimpleBarWithScrollElement | null>(null);

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
        if (selected) {
            const index = options.findIndex(option => option.value === selected.value);
            setSelectedIndex(index !== -1 ? index : null);
        }
    }, [selected, options]);

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

    const selectedOption = selectedIndex !== null ? options[selectedIndex] : options[0];

    return (
        <div className="select-container" ref={selectRef} onFocus={handleFocus} onBlur={handleBlur}>
            <SelectTrigger
                isOpen={isOpen}
                onClick={toggleDropdown}
                selectedOption={selectedOption}
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
