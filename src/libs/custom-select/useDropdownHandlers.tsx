import React, {useCallback} from 'react';

/**
 * Props for the dropdown handling hook.
 */
interface UseDropdownHandlersProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setHighlightedIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

/**
 * Custom hook for handling dropdown interactions.
 */
export const useDropdownHandlers = ({setIsOpen, setHighlightedIndex}: UseDropdownHandlersProps) => {
    const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);
    const closeDropdown = useCallback(() => setIsOpen(false), [setIsOpen]);

    const handleMouseEnter = useCallback(
        (index: number) => setHighlightedIndex(index),
        [setHighlightedIndex]
    );

    return {toggleDropdown, closeDropdown, handleMouseEnter};
};
