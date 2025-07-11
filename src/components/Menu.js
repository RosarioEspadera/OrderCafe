import React from 'react';

const Menu = () => {
    const foodItems = [
        { id: 1, name: 'Pizza', description: 'Cheesy and delicious', price: 9.99 },
        { id: 2, name: 'Burger', description: 'Juicy beef patty with toppings', price: 5.99 },
        { id: 3, name: 'Pasta', description: 'Pasta with marinara sauce', price: 7.99 },
        { id: 4, name: 'Salad', description: 'Fresh garden salad', price: 4.99 },
    ];

    return (
        <div>
            <h2>Menu</h2>
            <ul>
                {foodItems.map(item => (
                    <li key={item.id}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>${item.price.toFixed(2)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Menu;