import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle, setBreadcrumbs } from '../features/ui/uiSlice';

/**
 * usePageMeta Hook
 * Sets the page title and breadcrumbs in Redux (displayed in DashboardHeader).
 *
 * Usage:
 *   usePageMeta('Students', ['Admin', 'Students']);
 */
const usePageMeta = (title, breadcrumbs = []) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle(title));
        dispatch(setBreadcrumbs(breadcrumbs));

        // Update document title
        document.title = title
            ? `${title} — College Placement Tracker`
            : 'College Placement Tracker';

        return () => {
            dispatch(setPageTitle(''));
            dispatch(setBreadcrumbs([]));
        };
    }, [title, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default usePageMeta;
