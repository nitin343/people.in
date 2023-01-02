import React from 'react';
import styles from '../styles/Home.module.css'
import Header from './header';

function Layout(props) {
    const {children} = props
    return (

        <div className={`${styles.layoutContainer}`}>
            <Header />
            {children}
        </div>
    );
}

export default Layout;