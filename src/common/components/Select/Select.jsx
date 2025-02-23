import React from 'react';
import styles from './Select.module.scss';

/**
 * Custom dropdown select component.
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {string} label - Select label
 * @param {string} value - Currently selected value
 * @param {Function} onChange - Change handler function
 * @param {Array<[string, string]>} options - Array of [value, label] tuples
 * @returns {JSX.Element} Labeled dropdown select element
 */
export const Select = ({ label, value, onChange, options }) => (
    <div className={styles['select-wrapper']}>
        <label>{label}:</label>
        <select value={value} onChange={onChange} className={styles.select}>
            {options.map(([value, label]) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    </div>
);

export default Select;
