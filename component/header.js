import Image from 'next/image';
import React from 'react';
import { auth } from '../firebase';
import styles from '../styles/Home.module.css'


function Header(props) {
const{currentUser} = auth;
const notLoggedIn = {backgroundColor: '#05B7BF'};
const LoggedIn = {backgroundColor: 'black'};


    return (
        <div className={`${styles.headerContainer}`} style={currentUser ?  LoggedIn : notLoggedIn }>
            <Image
                src="/GroupLogo.svg"
                alt="GroupLogo Logo"
                className={`${styles.GroupLogo}`}
                style={LoggedIn}
                width={100}
                height={24}
                priority
              />
              
        </div>
    );
}

export default Header;