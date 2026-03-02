import { useState, useRef } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';
import styles from './TagInput.module.css';

/**
 * TagInput Component
 * Tag-based input for skills, technologies, etc.
 * Displays as read-only chips in view mode.
 * Allows add/remove in edit mode.
 *
 * @param {string[]} tags - Current tags array
 * @param {function} onAdd - Callback when tag is added
 * @param {function} onRemove - Callback when tag is removed
 * @param {boolean} editMode - Whether in edit mode
 * @param {string} placeholder - Input placeholder
 * @param {string} variant - 'primary' | 'secondary' | 'outline'
 * @param {number} maxTags - Maximum tags allowed
 */
const TagInput = ({
    tags = [],
    onAdd,
    onRemove,
    editMode = false,
    placeholder = 'Add a tag...',
    variant = 'primary',
    maxTags = 20,
    className = '',
}) => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        }
        if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
            onRemove?.(tags[tags.length - 1]);
        }
    };

    const addTag = () => {
        const cleaned = inputValue.trim();
        if (cleaned && !tags.includes(cleaned) && tags.length < maxTags) {
            onAdd?.(cleaned);
            setInputValue('');
        }
    };

    const handleAddClick = () => {
        if (inputValue.trim()) {
            addTag();
        } else {
            inputRef.current?.focus();
        }
    };

    // View mode — display tags as read-only chips
    if (!editMode) {
        if (tags.length === 0) {
            return (
                <div className={`${styles.tagList} ${className}`}>
                    <span className={styles.emptyTag}>None added yet</span>
                </div>
            );
        }
        return (
            <div className={`${styles.tagList} ${className}`}>
                {tags.map((tag) => (
                    <span key={tag} className={`${styles.tag} ${styles[variant]}`}>
                        {tag}
                    </span>
                ))}
            </div>
        );
    }

    // Edit mode — interactive tag input
    return (
        <div className={`${styles.tagInputContainer} ${className}`}>
            <div className={`${styles.tagInputWrapper} ${isFocused ? styles.focused : ''}`}>
                <div className={styles.tagsRow}>
                    {tags.map((tag) => (
                        <span key={tag} className={`${styles.tag} ${styles[variant]} ${styles.removable}`}>
                            {tag}
                            <button
                                type="button"
                                className={styles.removeBtn}
                                onClick={() => onRemove?.(tag)}
                                aria-label={`Remove ${tag}`}
                            >
                                <FiX />
                            </button>
                        </span>
                    ))}
                    {tags.length < maxTags && (
                        <input
                            ref={inputRef}
                            type="text"
                            className={styles.tagTextInput}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => {
                                setIsFocused(false);
                                if (inputValue.trim()) addTag();
                            }}
                            placeholder={tags.length === 0 ? placeholder : 'Add more...'}
                        />
                    )}
                </div>
                {tags.length < maxTags && (
                    <button
                        type="button"
                        className={styles.addBtn}
                        onClick={handleAddClick}
                        aria-label="Add tag"
                    >
                        <FiPlus />
                    </button>
                )}
            </div>
            <span className={styles.hint}>
                Press Enter or comma to add • {tags.length}/{maxTags}
            </span>
        </div>
    );
};

export default TagInput;
