import Router from 'next/router';
import React, { useEffect } from 'react';
import { auth } from '../firebase';
import styles from '../styles/Home.module.css'
import Banner from './banner';
import Header from './header';

function Layout(props) {
    const { currentUser } = auth
    const { children } = props

    useEffect(() => {
        if (currentUser == null || currentUser.accessToken == '') {
            Router.push('/auth/login')
        }
    }, [])

    return (
        <div className={currentUser ? `${styles.layoutContainerLoggedIn}` : `${styles.layoutContainer}`}>
            <Header />
            {currentUser && <Banner />}
            {children}
        </div>
    );
}

export default Layout;