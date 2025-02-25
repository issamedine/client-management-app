import React, { memo } from 'react';
import Button from "../../../common/components/Button/Button";
import styles from './ClientCard.module.scss';
import { formatDistanceToNow } from 'date-fns';

/**
 * Reusable client card component for displaying validation information
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {Object} props.client - Client data object
 * @param {Function} props.onValidate - Validation handler
 * @param {Function} props.onReject - Rejection handler
 * @returns {JSX.Element} Client information card with actions
 */
const ClientCard = memo(({ client, onValidate, onReject }) => (
    <div className={styles.clientCard}>
        <div className={styles.title}>{client.title}</div>
        <div className={styles.text}>{client.text}</div>
        <div className={styles.clientActions}>
            <small>
                {client?.created_at && formatDistanceToNow(new Date(client.created_at), {
                    addSuffix: true
                })}
            </small>
            <div>
                <Button
                    variant="success"
                    onClick={onValidate}
                    aria-label={`Validate ${client.title}`}
                >
                    Validate
                </Button>
                <Button
                    variant="danger"
                    onClick={onReject}
                    aria-label={`Reject ${client.title}`}
                >
                    Reject
                </Button>
            </div>
        </div>
    </div>
));

export default ClientCard;