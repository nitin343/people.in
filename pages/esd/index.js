import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SelectorPage from '../../component/section/selectorPage';
import { withRouter } from 'next/router';
import { Box, Container, Flex } from '@chakra-ui/react';
import axios from 'axios';
// import { async } from '@firebase/util';

function EsdHome({ router }) {
    // const {asPath , pathname} = useRouter;

    const [apiData, setApiData] = useState([]);


    // export default async function handler(req, res) {
    //     const options = {
    //         method: 'POST',
    //         url: 'https://geodb-cities-graphql.p.rapidapi.com/',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         data: {
    //             query: `{
    //                 countries {
    //                     name
    //                     capital
    //                     currency
    //                 }
    //             }`
    //         }
    //     };
    //     axios
    //         .request(options)
    //         .then(function (response) {
    //             console.log(response.data); // Response
    //         })
    //         .catch(function (error) {
    //             console.error(error);
    //         });
    // }

    useEffect(() => {
        axios({
            url: 'http://peoplein.ap-northeast-2.elasticbeanstalk.com/graphql',
            method: 'post',
            headers: { 
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlzcyI6ImhhYnNpZGEtcGVvcGxlaW4iLCJleHAiOjE2NzUwODU0MjAsImlhdCI6MTY3NDQ4MDYyMH0.TQcpCBIuxw1LZrp8ogHeAOwrue4qe26nhHeVy_Ou868', 
                'Content-Type': 'application/json', 
                'Cookie': 'JSESSIONID=4C58F5F92BF39DC1165E7668A316D9EF'
              },
            data: {
                query: `{
                    getAllApplicants {
                        id
                        firstName
                        lastName
                        country
                        gender
                        visa
                        dateOfBirth
                        degree
                        yearsOfExperience
                        resumeGoogleDrivePath
                        languages{
                            languageName
                        }
                        skills{
                            skillName
                            skillType
                        }
                        
                    }
                }`
            }
        }).then((result) => {
            setApiData(result.data.data.getAllApplicants)
        }).catch((error) => {
            console.log(result.error, 'error message');
        });

        // console.log(apiData, 'response');
    }, [])


    return (
        <Container maxW="container.xl" pb={5} >
            <Box w='100%'>
                <SelectorPage />
            </Box>
        </Container>
    )
}

export default withRouter(EsdHome);