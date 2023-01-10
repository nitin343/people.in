import React from 'react';
import styles from '../../../styles/Home.module.css';
import { Button, Center } from '@chakra-ui/react'
import { useAuth } from '../../../context/AuthContext';
import Router from 'next/router';

function NavigationPage(props) {

    const { logout } = useAuth();

    const navLinkname = [{ routerName: 'Search' ,id: 1 } , { routerName: 'Favorites' , id : 2 } , { routerName: 'Interview' , id: 3 }]

    return (
        <>
            <div className={`${styles.company_Name}`}>Company Name</div>
            <div className={`${styles.company_Navigation}`}>
                <div className={`${styles.company_Navigation_header}`}>
                    NAVIGATION
                </div>
                <div className={`${styles.company_Navigation_routes}`}>
                    {navLinkname && navLinkname.map((obj) => (
                        <span style={{cursor: 'pointer'}} >{obj.routerName}</span>
                    ))}
                </div>
                <div className={`${styles.company_Navigation_signout}`}>
                    <Button width='90%' colorScheme='red' size='sm' onClick={async () => {
                        await logout();
                        Router.push('/auth/login')
                    }} >Sign Out</Button>
                </div>
            </div>
        </>
    );
}

export default NavigationPage;