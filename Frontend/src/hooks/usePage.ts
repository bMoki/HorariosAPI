import { useState } from "react";

export const usePage = () => {
    const [activePage, setActivePage] = useState(0);
    const changePage = (index: number) => {
        setActivePage(index);
    }

    return { changePage, activePage }
}