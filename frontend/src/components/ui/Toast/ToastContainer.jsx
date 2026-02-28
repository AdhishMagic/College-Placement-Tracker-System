import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectToasts, removeToast } from '../../../features/ui/uiSlice';
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';
import './Toast.css';

const ICONS = {
    success: <FiCheckCircle />,
    error: <FiXCircle />,
    warning: <FiAlertTriangle />,
    info: <FiInfo />,
};

/**
 * ToastContainer
 * Renders all active toasts from Redux UI state.
 */
const ToastContainer = () => {
    const toasts = useSelector(selectToasts);
    const dispatch = useDispatch();

    return (
        <div className="toast-container" role="status" aria-live="polite">
            {toasts.map((toast) => (
                <ToastItem
                    key={toast.id}
                    toast={toast}
                    onClose={() => dispatch(removeToast(toast.id))}
                />
            ))}
        </div>
    );
};

const ToastItem = ({ toast, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, toast.duration);
        return () => clearTimeout(timer);
    }, [toast.duration, onClose]);

    return (
        <div className={`toast toast--${toast.type}`}>
            <span className="toast__icon">{ICONS[toast.type]}</span>
            <p className="toast__message">{toast.message}</p>
            <button className="toast__close" onClick={onClose} aria-label="Close notification">
                <FiX />
            </button>
        </div>
    );
};

export default ToastContainer;
