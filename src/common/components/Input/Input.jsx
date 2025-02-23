import React from 'react';
import styles from './Input.module.scss';

/**
 * Reusable input field component with label.
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {string} label - Input label
 * @param {string} type - Input type (text, password, email, etc.)
 * @param {string} value - Controlled input value
 * @param {Function} onChange - Change handler function
 * @param {boolean} [required] - Marks input as required
 * @param {boolean} [disabled] - Disables the input
 * @returns {JSX.Element} Labeled input field
 */
export const Input = ({ label, type, value, onChange, required, disabled }) => (
  <div className={styles['input-wrapper']}>
    <label>{label}:</label>
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      placeholder={label}
    />
  </div>
);

export default Input;
