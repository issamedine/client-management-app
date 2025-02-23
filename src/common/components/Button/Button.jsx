import React from 'react';
import styles from './Button.module.scss';  // Import the SCSS module

/**
 * A reusable button component with customizable variants.
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {string} [variant='primary'] - Button style variant
 * @param {React.ReactNode} children - Button content
 * @param {Object} props - Additional HTML button attributes
 * @returns {JSX.Element} Styled button element
 */
const Button = ({ variant = 'primary', children, ...props }) => {
    return (
        <button className={`${styles.button} ${styles[variant]}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
