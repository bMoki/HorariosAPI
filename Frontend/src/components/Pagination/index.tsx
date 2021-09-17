function Pagination() {
    return (
        <>
            <nav>
                <ul className="pagination pagination-sm">
                    <li className="page-item"><button className="btn page-link">+</button></li>
                    <li className="page-item"><button className="btn page-link">1</button></li>
                    <li className="page-item"><button className="btn page-link">2</button></li>
                    <li className="page-item"><button className="btn page-link">3</button></li>
                    <li className="page-item"><button className="btn page-link">+</button></li>
                </ul>
            </nav>
        </>
    );
}

export default Pagination;
