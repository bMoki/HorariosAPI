import { ChangeEvent, useEffect, useState } from "react"

export const useSearch = () => {
    const [search, setSearch] = useState("");
    const [value, setValue] = useState("");

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setValue(search);
        }, 500); 

        return () => clearTimeout(timeout)
    },[search])

    return { search, searchHandler, value }
}