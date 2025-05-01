import React, { useState } from 'react';
import Menu from '../components/Menu';

const Order = () => {
    const [order, setOrder] = useState([]);

    const addToOrder = (item) => {
        setOrder([...order, item]);
    };

    const handleSubmit = () => {
        // Logic to submit the order
        console.log('Order submitted:', order);
    };

    return (
        <div>
            <h1>Order Food</h1>
            <Menu onAddToOrder={addToOrder} />
            <button onClick={handleSubmit}>Submit Order</button>
        </div>
    );
};

export default Order;