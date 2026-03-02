/**
 * ApplicationPagination
 * Simple pagination component.
 */
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../../features/applications/applicationsSlice';
import './ApplicationPagination.css';

const ApplicationPagination = ({ currentPage, totalPages, totalFiltered }) => {
    const dispatch = useDispatch();

    if (totalPages <= 1) return null;

    const handleNext = () => {
        if (currentPage < totalPages) dispatch(setCurrentPage(currentPage + 1));
    };

    const handlePrev = () => {
        if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
    };

    return (
        <div className="app-pagination" role="navigation" aria-label="Pagination">
            <span className="app-pagination__info">
                Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>
            <div className="app-pagination__controls">
                <button
                    className="app-pagination__btn"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Prev
                </button>
                <div className="app-pagination__pages" aria-hidden="true">
                    {Array.from({ length: totalPages }).map((_, i) => {
                        const pageNum = i + 1;
                        return (
                            <button
                                key={pageNum}
                                className={`app-pagination__num ${pageNum === currentPage ? 'app-pagination__num--active' : ''}`}
                                onClick={() => dispatch(setCurrentPage(pageNum))}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>
                <button
                    className="app-pagination__btn"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                >
                    Next
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ApplicationPagination;
