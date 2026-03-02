import React, { useState, useRef, useEffect } from 'react';
import styles from './SharedComponents.module.css';
import multiSelectStyles from './MultiSelect.module.css';

const MultiSelect = ({ label, options, selectedValues, onChange, placeholder = "Select..." }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (val) => {
        const newValues = selectedValues.includes(val)
            ? selectedValues.filter(v => v !== val)
            : [...selectedValues, val];
        onChange(newValues);
    };

    return (
        <div className={styles.inputGroup} ref={dropdownRef}>
            <label className={styles.label}>{label}</label>
            <div className={multiSelectStyles.selectWrapper}>
                <div className={multiSelectStyles.selectTrigger} onClick={() => setIsOpen(!isOpen)}>
                    {selectedValues.length === 0 ? (
                        <span className={multiSelectStyles.placeholder}>{placeholder}</span>
                    ) : (
                        <div className={multiSelectStyles.selectedPills}>
                            {selectedValues.map(val => (
                                <span key={val} className={multiSelectStyles.pill}>
                                    {options.find(o => o.value === val)?.label || val}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleOption(val); }}
                                        className={multiSelectStyles.removePillBtn}
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                    <span className={multiSelectStyles.caret}>&#9662;</span>
                </div>
                {isOpen && (
                    <ul className={multiSelectStyles.selectDropdown}>
                        {options.map(opt => (
                            <li
                                key={opt.value}
                                className={multiSelectStyles.dropdownItem}
                                onClick={() => toggleOption(opt.value)}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedValues.includes(opt.value)}
                                    readOnly
                                    className={multiSelectStyles.checkbox}
                                />
                                {opt.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MultiSelect;
