import { useRouter } from 'next/router';
import React from 'react';
import SelectorPage from '../../component/section/selectorPage';
import { withRouter } from 'next/router';
import { Box, Container, Flex } from '@chakra-ui/react';

function EsdHome({ router }) {
    // const {asPath , pathname} = useRouter;

    console.log(router, 'pathname');
    return (
        <Container maxW="container.xl" pb={5} >
            <Box w='100%'>
                <SelectorPage />
            </Box>
        </Container>
    )
}

export default withRouter(EsdHome);