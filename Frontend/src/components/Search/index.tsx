import { AiOutlineSearch } from "react-icons/ai";

type IProps = {
    search: string;
    searchHandler:(event: React.ChangeEvent<HTMLInputElement>)=>void;
}
function Search({search,searchHandler}: IProps) {

    return (
        <>
            <form className="row g-3" onSubmit={(event)=>event.preventDefault()}>
                <div className="col input-group input-group-lg flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping"><AiOutlineSearch className="fs-3" /></span>
                    <input type="text" className="form-control" id="inputSearch" value={search} onChange={searchHandler} placeholder="Pesquisar" />
                </div>
            </form>

        </>
    );
};
export default Search;
