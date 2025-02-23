import React, { memo } from 'react';
import styles from './List.module.scss';

/**
 * List Component
 * 
 * A reusable list component.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {Array} props.items - Array of items to display.
 * @param {(item: any) => JSX.Element} props.renderItem - Function to render each item.
 * @returns {JSX.Element} The rendered List component.
 */
const List = memo(({ items, renderItem }) => {
    if (!items || items.length === 0) {
        return <p className={styles['no-records']}>No records available.</p>;
    }

    return (
        <ul className={styles.list}>
            {items.map((item, index) => (
                <React.Fragment key={item.id || index}>
                    {renderItem(item)}
                </React.Fragment>
            ))}
        </ul>
    );
});

export default List;