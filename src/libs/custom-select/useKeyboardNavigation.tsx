import React, {useCallback} from 'react';
import {Virtualizer} from '@tanstack/react-virtual';
import {Option} from "./types.ts";

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
            if (!isOpen) {
                if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
                    setIsOpen(true);
                    e.preventDefault();
                    return;
                }
            }

            const handleNavigation = (direction: 1 | -1) => {
                const newIndex = highlightedIndex === null
                    ? direction === 1 ? 0 : options.length - 1
                    : Math.max(0, Math.min(options.length - 1, (highlightedIndex ?? 0) + direction));
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
