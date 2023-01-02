import Image from 'next/image';
import React from 'react';
import styles from '../styles/Home.module.css'
function Header(props) {
const notLoggedIn = {backgroundColor: '#05B7BF'};
const LogonotLoggedIn = {backgroundColor: 'black'};


    return (
        <div className={`${styles.headerContainer}`} style={notLoggedIn}>
            <Image
                src="/GroupLogo.svg"
                alt="GroupLogo Logo"
                className={`${styles.GroupLogo}`}
                style={LogonotLoggedIn}
                width={100}
                height={24}
                priority
              />
              
        </div>
    );
}

export default Header;