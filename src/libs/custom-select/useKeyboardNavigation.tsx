import React, {useCallback} from 'react';
import {Virtualizer} from '@tanstack/react-virtual';
import {Option} from "./types.ts";

/**
 * Props for the keyboard navigation hook.
 */
interface UseKeyboardNavigationProps {
    isOpen: boolean;
    highlightedIndex: number | null;
    options: Option[];
    rowVirtualizer: Virtualizer<HTMLElement, Element>;
    handleOptionClick: (index: number) => void;
    setHighlightedIndex: React.Dispatch<React.SetStateAction<number | null>>;
    closeDropdown: () => void;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Custom hook for handling keyboard navigation in a dropdown list.
 */
export const useKeyboardNavigation = ({
                                          isOpen,
                                          highlightedIndex,
                                          options,
                                          rowVirtualizer,
                                          handleOptionClick,
                                          setHighlightedIndex,
                                          closeDropdown,
                                          setIsOpen
                                      }: UseKeyboardNavigationProps) => {
    return useCallback(
        (e: KeyboardEvent) => {
            if (!isOpen && ['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
                setIsOpen(true);
                e.preventDefault();
                return;
            }

            const handleNavigation = (direction: 1 | -1) => {
                const currentIndex = highlightedIndex ?? (direction === 1 ? -1 : options.length);
                const newIndex = Math.max(0, Math.min(options.length - 1, currentIndex + direction));
                rowVirtualizer.scrollToIndex(newIndex);
                setHighlightedIndex(newIndex);
                e.preventDefault();
            };

            switch (e.key) {
                case 'ArrowDown':
                    handleNavigation(1);
                    break;
                case 'ArrowUp':
                    handleNavigation(-1);
                    break;
                case 'Enter':
                    if (highlightedIndex !== null) {
                        handleOptionClick(highlightedIndex);
                    }
                    break;
                case 'Escape':
                    closeDropdown();
                    break;
            }
        },
        [isOpen, highlightedIndex, options, rowVirtualizer, handleOptionClick, setHighlightedIndex, closeDropdown, setIsOpen]
    );
};
