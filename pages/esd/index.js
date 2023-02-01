import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SelectorPage from '../../component/section/selectorPage';
import { withRouter } from 'next/router';
import { Box, Container, Flex } from '@chakra-ui/react';
import axios from 'axios';
// import { async } from '@firebase/util';

function EsdHome({ router }) {

    return (
        <Container maxW="container.xl" pb={5} >
            <Box w='100%'>
                <SelectorPage />
            </Box>
        </Container>
    )
}

export default withRouter(EsdHome);