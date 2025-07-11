import React, { useState } from 'react';

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        paymentMethod: 'creditCard',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the checkout process (e.g., API call to submit order)
        console.log('Order submitted:', formData);
    };

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Address:
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Payment Method:
                        <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                        >
                            <option value="creditCard">Credit Card</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </label>
                </div>
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;