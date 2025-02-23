import React, { memo } from 'react';
import Button from "../../../common/components/Button/Button";

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
    <div className="client-card">
        <h3>{client.title}</h3>
        <p>{client.text}</p>
        <div className="client-actions">
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
));

export default ClientCard;