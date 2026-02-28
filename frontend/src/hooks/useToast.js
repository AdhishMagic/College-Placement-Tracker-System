import { useDispatch } from 'react-redux';
import { addToast } from '../features/ui/uiSlice';

/**
 * useToast Hook
 * Simplified toast dispatch for components.
 *
 * Usage:
 *   const toast = useToast();
 *   toast.success('Item saved!');
 *   toast.error('Something went wrong');
 */
const useToast = () => {
    const dispatch = useDispatch();

    return {
        success: (message, duration) =>
            dispatch(addToast({ type: 'success', message, duration })),
        error: (message, duration) =>
            dispatch(addToast({ type: 'error', message, duration })),
        warning: (message, duration) =>
            dispatch(addToast({ type: 'warning', message, duration })),
        info: (message, duration) =>
            dispatch(addToast({ type: 'info', message, duration })),
    };
};

export default useToast;
