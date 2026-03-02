import React, { useState } from 'react';
import styles from './SharedComponents.module.css';
import tagStyles from './TagInput.module.css';

const TagInput = ({ label, tags, onChange, placeholder, hint }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (newTag && !tags.includes(newTag)) {
                onChange([...tags, newTag]);
            }
            setInputValue('');
        }
    };

    const removeTag = (indexToRemove) => {
        onChange(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className={styles.inputGroup}>
            <label className={styles.label}>{label}</label>
            <div className={tagStyles.tagInputWrapper}>
                <div className={tagStyles.tagsContainer}>
                    {tags.map((tag, index) => (
                        <span key={index} className={tagStyles.tagItem}>
                            {tag}
                            <button type="button" onClick={() => removeTag(index)} className={tagStyles.removeBtn}>
                                &times;
                            </button>
                        </span>
                    ))}
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={tags.length === 0 ? placeholder : ''}
                        className={tagStyles.tagInputField}
                    />
                </div>
            </div>
            {hint && <span className={styles.hint}>{hint}</span>}
        </div>
    );
};

export default TagInput;
