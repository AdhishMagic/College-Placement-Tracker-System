/**
 * Pagination Component
 * Page navigation with previous/next and numbered page buttons.
 * Supports ellipsis for large page counts.
 */
import { useDispatch } from 'react-redux';
import { setPage } from '../../../features/eligibility/eligibilitySlice';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, totalFiltered }) => {
    const dispatch = useDispatch();

    if (totalPages <= 1) return null;

    /**
     * Build page number array with ellipsis.
     * Shows: [1] ... [current-1] [current] [current+1] ... [last]
     */
    const getPageNumbers = () => {
        const pages = [];
        const delta = 1; // pages around current

        const start = Math.max(2, currentPage - delta);
        const end = Math.min(totalPages - 1, currentPage + delta);

        pages.push(1);

        if (start > 2) pages.push('...');

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages - 1) pages.push('...');

        if (totalPages > 1) pages.push(totalPages);

        return pages;
    };

    return (
        <nav className="pagination" aria-label="Job list pagination">
            <p className="pagination__info">
                Showing page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                <span className="pagination__total"> ({totalFiltered} jobs)</span>
            </p>

            <div className="pagination__controls">
                {/* Previous */}
                <button
                    className="pagination__btn pagination__btn--prev"
                    onClick={() => dispatch(setPage(currentPage - 1))}
                    disabled={currentPage <= 1}
                    aria-label="Previous page"
                    id="pagination-prev"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Prev
                </button>

                {/* Page Numbers */}
                <div className="pagination__pages">
                    {getPageNumbers().map((page, idx) =>
                        page === '...' ? (
                            <span key={`ellipsis-${idx}`} className="pagination__ellipsis">
                                ···
                            </span>
                        ) : (
                            <button
                                key={page}
                                className={`pagination__page-btn ${page === currentPage ? 'pagination__page-btn--active' : ''}`}
                                onClick={() => dispatch(setPage(page))}
                                aria-label={`Page ${page}`}
                                aria-current={page === currentPage ? 'page' : undefined}
                            >
                                {page}
                            </button>
                        )
                    )}
                </div>

                {/* Next */}
                <button
                    className="pagination__btn pagination__btn--next"
                    onClick={() => dispatch(setPage(currentPage + 1))}
                    disabled={currentPage >= totalPages}
                    aria-label="Next page"
                    id="pagination-next"
                >
                    Next
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Pagination;
