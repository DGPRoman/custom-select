import React from "react";
import SimpleBar from "simplebar-react";

/**
 * Represents an option in a select list.
 */
export interface Option {
    value: string;
    label: string;
}

/**
 * Extends the SimpleBar component's ref type with a custom method for accessing the scroll element.
 */
export interface SimpleBarWithScrollElement extends React.ComponentRef<typeof SimpleBar> {
    getScrollElement: () => HTMLElement;
}
