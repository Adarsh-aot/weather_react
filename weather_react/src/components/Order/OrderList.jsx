import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './OrderList.module.css';

function OrderList() {
    const BASE_URL = "https://backend-l627.onrender.com/";
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        axios.get(BASE_URL, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    const cancelOrder = (id) => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('No token found');
            return;
        }

        axios.delete(`${BASE_URL}/${id}`)
        .then(response => {
            setData(response.data);
            console.log('Order canceled successfully');
        })
            .catch(error => console.error('Error canceling order:', error));
    };
           





    return (
        <div className={styles.container}>
            <div className={styles.header}>Order List</div>
            <div className={styles.order}>
            {data.length > 0 ? (
                data.map((item) => (
                    <div key={item.id} className={styles.orderCard}>
                        <h1 className={styles.orderTitle}>{item.name}</h1>
                        <p className={styles.orderDetails}>By: {item.by}</p>
                        <p className={styles.orderDetails}>Post: {item.post}</p>
                        <button onClick={() => cancelOrder(item.id)} className={styles.cancelButton}>Cancel Order</button>
                    </div>
                ))
            ) : (
                <div className={styles.noOrders}>No orders available.</div>
            )}
            </div>
        </div>
    );
}

export default OrderList;