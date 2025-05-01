import React from 'react';

const Footer = () => {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} Food Ordering. All rights reserved.</p>
            <nav>
                <ul>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/terms">Terms of Service</a></li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;