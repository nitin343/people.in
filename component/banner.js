import Image from 'next/image';
import React from 'react';

function Banner(props) {
    return (
        <>
            <div>
            <Image
                src="/Group237.svg"
                alt="frame banner"
                width={100}
                height={100}
                style={{'height': '30%','width':'100%'}}
                priority
              />
            </div>
        </>
    );
}

export default Banner;