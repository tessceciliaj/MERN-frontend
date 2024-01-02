
interface PaginatorProps {
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void
}

const Paginator = (prop: PaginatorProps) => {
    const pages = Array.from({ length: prop.totalPages }, (_, i) => i + 1);
    // const pages = Array.from(
    //         Array(prop.totalPages)
    //             .keys()
    //     ).map(i => i + 1);

    // Två sätt att skapa en array some ser ut så: [1, 2, 3, 4...]

    return (<div>
        {pages.map(page => (
            <button key={page} onClick={() => prop.setPage(page)}>
                {page}
            </button>
        ))}
    </div>)
}

export default Paginator;