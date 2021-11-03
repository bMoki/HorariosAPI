import { useState } from "react";

export const usePage = () => {
    const [activePage, setActtivePage] = useState(0);
    const changePage = (index: number) => {
        setActtivePage(index);
    }

    return { changePage, activePage }
}