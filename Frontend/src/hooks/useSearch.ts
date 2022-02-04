import { ChangeEvent, useState } from "react"

export const useSearch = () => {
    const [search, setSearch] = useState("");

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    return { search, searchHandler }
}