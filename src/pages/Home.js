import React from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div>
            <Header />
            <main>
                <h1>Welcome to Our Food Ordering Service</h1>
                <p>Order your favorite meals online!</p>
                <Menu />
            </main>
            <Footer />
        </div>
    );
};

export default Home;