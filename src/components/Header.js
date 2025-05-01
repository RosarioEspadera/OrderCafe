import React from 'react';

const Header = () => {
    return (
        <header>
            <h1>Food Ordering</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/order">Order</a></li>
                    <li><a href="/checkout">Checkout</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;