import './Spinner.css';

/**
 * Spinner Component
 * Loading indicator.
 */
const Spinner = ({ size = 'md', fullScreen = false, className = '' }) => {
    if (fullScreen) {
        return (
            <div className="spinner-fullscreen">
                <div className={`spinner spinner--${size} ${className}`} />
            </div>
        );
    }

    return <div className={`spinner spinner--${size} ${className}`} />;
};

export default Spinner;
