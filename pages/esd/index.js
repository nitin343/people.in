import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SelectorPage from '../../component/section/selectorPage';
import { withRouter } from 'next/router';
import { Box, Container, Flex } from '@chakra-ui/react';
import axios from 'axios';
// import { async } from '@firebase/util';

function EsdHome({ router }) {
    // const {asPath , pathname} = useRouter;

    const [apiDataQl, setApiDataQl] = useState([]);

    // useEffect(async () => {
       
    //    function fetchData  () { 
    //     axios({
    //         url: 'http://peoplein.ap-northeast-2.elasticbeanstalk.com/graphql',
    //         method: 'post',
    //         headers: { 
    //             'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlzcyI6ImhhYnNpZGEtcGVvcGxlaW4iLCJleHAiOjE2NzUwODU0MjAsImlhdCI6MTY3NDQ4MDYyMH0.TQcpCBIuxw1LZrp8ogHeAOwrue4qe26nhHeVy_Ou868', 
    //             'Content-Type': 'application/json', 
    //           },
    //         data: {
    //             query: `{
    //                 getAllApplicants {
    //                     id
    //                     firstName
    //                     lastName
    //                     country
    //                     gender
    //                     visa
    //                     dateOfBirth
    //                     degree
    //                     yearsOfExperience
    //                     resumeGoogleDrivePath
    //                     languages{
    //                         languageName
    //                     }
    //                     skills{
    //                         skillName
    //                         skillType
    //                     }
                        
    //                 }
    //             }`
    //         }
    //     }).then((result) => {
    //         setApiDataQl(result.data.data.getAllApplicants)
    //         console.log(apiDataQl , 'apiDataapiData');
    //     }).catch((error) => {
    //         console.log(error.error, 'error message');
    //     });
    // }

    // await fetchData();
    // }, [])


    return (
        <Container maxW="container.xl" pb={5} >
            <Box w='100%'>
                <SelectorPage />
            </Box>
        </Container>
    )
}

export default withRouter(EsdHome);