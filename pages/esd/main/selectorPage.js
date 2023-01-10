import { Box, Button, Container, Flex, VStack } from '@chakra-ui/react';
import React from 'react';
// import NavigationPage from './navigation';
import NavigationPage from './navigation';
import { Input } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import CandidateCard from '../../../component/card/candidateCard';


function SelectorPage() {
    return (
        <div>
            <Container maxW="container.xl" p={0}>
                <Flex border='1px solid red'  direction={{ base: 'column', md: 'row' }}   h="100%" py={0} >
                    <Box
                        w={['100%' , '100%' , '100%' , '50%']}
                        height={{base:"100vh"}}
                        p={10}
                        spacing={10}
                        alignItems="flex-start"
                    >
                        <NavigationPage />
                    </Box>
                    <Box
                        w="full"
                        h="full"
                        p={10}
                        spacing={10}
                        alignItems="flex-start"
                    >
                        <VStack border='1px solid #F8F9FA' borderRadius='5px' bg='#F8F9FA' h='30%' width='100%' flexDirection='row' my={2} px={5}>
                            <VStack px={5}><Search2Icon /></VStack>
                            <VStack px={5} width='100%'><Input
                                color='tomato'
                                placeholder='search'
                                bg='white'
                                _placeholder={{ opacity: 0.4, color: 'inherit' }}
                            /></VStack>
                        </VStack>
                        <VStack overflowY='scroll' height='full' display='flex'>
                           <CandidateCard />
                        </VStack>

                    </Box>
                </Flex>
            </Container>
        </div>
    );
}

export default SelectorPage;