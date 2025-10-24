import { SyntheticEvent, useRef } from "react";

export const useOnIngredientClick = (cb: () => void) => {
    const DELETE_BUTTON_SELECTOR = ".constructor-element__action";
    const containerRef = useRef<HTMLDivElement>(null);

    const onClick = (evt: SyntheticEvent) => {
        cb();
    };

    return { containerRef, onClick };
};
