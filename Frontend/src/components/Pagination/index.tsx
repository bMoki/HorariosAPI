import { Page } from "types/Page";

type Props = {
    page: Page;
    onPageChange: Function;
}

function Pagination({ page, onPageChange }: Props) {
    return (
        <>
            <div className="row mt-auto">
                <nav>
                    <ul className="pagination pagination-sm">
                        <li className={`page-item ${page.first ? 'disabled' : ''}`}>
                            <button className="btn page-link" onClick={() => onPageChange(page.number - 1)}>-</button>
                        </li>
                        <li className="page-item"><button className="btn page-link">{page.number + 1}</button></li>
                        <li className={`page-item ${page.last ? 'disabled' : ''}`}>
                            <button className="btn page-link" onClick={() => onPageChange(page.number + 1)}>+</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Pagination;
