import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Notification.module.scss';
import { removeNotification, removePendingClient } from '../../../redux/slices/clientsSlice';
import { clientsService } from '../../../services/clientsService';

const Notification = () => {
    const notifications = useSelector(state => state.clients.notifications);
    const dispatch = useDispatch();
    const [hovered, setHovered] = useState(null);
    
    useEffect(() => {
        const timers = new Map();

        notifications.forEach(notification => {
            if (!timers.has(notification.id)) {
                const timer = setTimeout(() => {
                    if (hovered !== notification.id) {
                        dispatch(removeNotification(notification.id));
                    }
                }, 5000); // Supprime après 10 secondes
                timers.set(notification.id, timer);
            }
        });

        return () => {
            timers.forEach((timer) => clearTimeout(timer));
        };
    }, [notifications, hovered, dispatch]);

    const handleValidation = useCallback(
        async (input, isValid) => {
            try {
                const operation = isValid ? clientsService.validateClient : clientsService.rejectClient;
                await operation(typeof input === 'object' ? input : { id: input });
                dispatch(removePendingClient(input.id));
                dispatch(removeNotification(input.id));
            } catch (error) {
                console.error(`Error ${isValid ? 'validating' : 'rejecting'} client:`, error);
            }
        },
        [dispatch]
    );

    return (
        <div className={styles.notification_container}>
            {notifications.map(notification => (
                <div
                    key={notification.id}
                    className={styles.notification}
                    onMouseEnter={() => setHovered(notification.id)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <div className={styles.notificationHeader}>
                        <div>{notification.title}</div>
                        <button
                            onClick={() => dispatch(removeNotification(notification.id))}
                            className={styles.closeButton}
                            aria-label="Fermer la notification"
                        >
                            ✖
                        </button>
                    </div>
                    <div>{notification.text}</div>
                    <div className={styles.notificationActions}>
                        <button
                            onClick={() => handleValidation(notification, true)}
                            className={styles.acceptButton}
                            aria-label="Valider la notification"
                        >
                            Valider
                        </button>
                        <button
                            onClick={() => handleValidation(notification, false)}
                            className={styles.rejectButton}
                            aria-label="Rejeter la notification"
                        >
                            Rejeter
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Notification;
