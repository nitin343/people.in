import React from 'react';
import styles from '../../styles/Home.module.css';
import { Box, Button, Center } from '@chakra-ui/react'
import { useAuth } from '../../context/AuthContext';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';

function NavigationPage(props) {
    const router = useRouter();
    const query = router.query;
    const name = query.page;

    const { logout } = useAuth();

    const navLinkname = [{ routerName: 'Search', id: 1 }, { routerName: 'Favorites', id: 2 }, { routerName: 'Interview', id: 3 }]

    return (
        <Box w='100%' h='100%'>
            <div className={`${styles.company_Name}`}>Company Name</div>
            <div className={`${styles.company_Navigation}`}>
                <div className={`${styles.company_Navigation_header}`}>
                    NAVIGATION
                </div>
                <div className={`${styles.company_Navigation_routes}`}>
                    {navLinkname && navLinkname.map((obj, index) => (
                        <Link scroll={false} href={{
                            pathname: '/esd',
                            query: { "page": obj.routerName }, // the data
                        }}>

                            {obj.routerName == name ? (<span> {'->'} </span>) : <></>}
                            {obj.routerName}

                        </Link>
                    ))}
                </div>
                <div className={`${styles.company_Navigation_signout}`}>
                    <Button width='90%' colorScheme='red' size='sm' onClick={async () => {
                        await logout();
                        Router.push('/auth/login')
                    }} >Sign Out</Button>
                </div>
            </div>
        </Box>
    );
}

export default NavigationPage;