import React, { Fragment, useEffect, useState } from 'react';
import { Card, Container, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, ButtonGroup, Button, Divider, Box, VStack, IconButton, Flex, keyframes, HStack, Tag } from '@chakra-ui/react'
import { candidate } from '../../data/candidates';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react'
import { AddIcon, DownloadIcon, EmailIcon, MinusIcon, StarIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import TransitionExample from '../Modal/shortlistModal';
import { useDispatch } from 'react-redux';
import { SET_FAV } from '../../Redux/reducers/faviorites';
import Router, { useRouter } from 'next/router';
import Favourite from '../buttons/favourite';
import styles from '../../styles/Home.module.css'
import { useFetchFavorites } from '../../hooks/fetchFavorites';
import { Spinner } from '@chakra-ui/react'
import ProfileModal from '../Modal/profileModal';
import InfiniteScroll from 'react-infinite-scroll-component';



function CandidateCard({ candidateDetail }) {

    const [candidateProfile, setCandidateProfile] = useState(candidateDetail);
    const [pageSize, setpageSize] = useState(4)

    const { loading } = useFetchFavorites()
    console.log(loading);

    useEffect(() => {
        //    console.log(candidateDetail);
        setCandidateProfile(candidateDetail)
    }, [candidateDetail])

    // console.log(pageSize < candidateProfile.length , 'okkkk');
    // console.log(candidateProfile.length , '123');
    // console.log(pageSize , '1234');

    const router = useRouter();
    const query = router.query;
    const name = query.page;

    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
            if(pageSize < candidateProfile.length){
            setpageSize(name => name + 4)
           }
        }, 1500);
    };

    return (
        <>
            {loading && name !== 'Search' ?
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl' />

                :

                candidateProfile !== undefined && candidateProfile.length > 0 ?
                    <Box display='flex' flexWrap='wrap' h='auto' alignItems='flex-start' w='100% ' >
                        <Stack w='100%'>
                            <InfiniteScroll
                                style={{ display: 'flex', flexWrap: 'wrap' }}
                                dataLength={pageSize}
                                next={fetchMoreData}
                                hasMore={pageSize < candidateProfile.length}
                                loader={<VStack mt={10} w='100%'><Text>Loading...</Text></VStack>}
                                endMessage={
                                    <VStack mt={10} w='100%'>
                                        <b>Yay! You have seen it all</b>
                                    </VStack>
                                }
                            >

                                {candidateProfile.slice(0, pageSize).map((card, index) => (
                                    <Card className={styles.cardMain} key={card.id} width={{ base: '100%', lg: '47%' }} h='auto' my='10px' mx={2} spacing={5}>
                                        <CardHeader p={0}>
                                            <Box w='100%' h='100%' display='flex' flexDirection='row' alignContent='flex-start'>
                                                <VStack w='45%' h='170px' pr={2}>
                                                    <Image
                                                        boxSize='100%'
                                                        // h='200px'
                                                        objectFit='cover'
                                                        src={card.profileImage ? card.profileImage : ''}
                                                        alt='Dan Abramov'
                                                    />
                                                </VStack>
                                                <VStack w='50%' p={2} color='#68717A' fontWeight='bold' fontSize='16px' justifyContent='space-between' alignItems='flex-start' h='170px'>
                                                    <Text noOfLines={[1, 2]} title={card.country}>Nationality: <span style={{ fontWeight: 'lighter' }}> {card.country} </span></Text>
                                                    <Text title={card.visa}>Visa: <span style={{ fontWeight: 'lighter' }}> {card.visa} </span></Text>
                                                    <Text title={card.gender}>Gender: <span style={{ fontWeight: 'lighter' }}> {card.gender} </span></Text>
                                                </VStack>
                                            </Box>
                                        </CardHeader>
                                        <CardBody >
                                            <Stack mt='1' spacing='3' flexDirection='row'>
                                                <Box flex='1'>
                                                    <Heading color='#152536' fontSize='20px'> {card.firstName} {card.lastName}</Heading>
                                                    <Text fontSize='16px' color='#68717A'>{card.Specialization}</Text>
                                                </Box>
                                                <ProfileModal card={card} />
                                            </Stack>
                                        </CardBody>
                                        <Divider />
                                        <CardBody>
                                            <Text fontSize='16px' color='#68717A'>Experience: {card.yearsOfExperience}</Text>
                                        </CardBody>
                                        <Divider />
                                        <CardBody p={1} width='100%'>
                                            <Accordion allowMultiple>
                                                <AccordionItem py={1} border='none'>
                                                    {({ isExpanded }) => (
                                                        <>
                                                            <h2>
                                                                <AccordionButton>
                                                                    <Box as="span" flex='1' px={0.8} fontSize='16px' color='#68717A' textAlign='left'>
                                                                        Programing Languages
                                                                    </Box>
                                                                    {isExpanded ? (
                                                                        <MinusIcon fontSize='12px' />
                                                                    ) : (
                                                                        <AddIcon fontSize='12px' />
                                                                    )}
                                                                </AccordionButton >
                                                            </h2>
                                                            <AccordionPanel pb={4}>
                                                                <VStack h='auto' m='5px' flexDirection='row' gap={3} justifyContent='flex-start' alignItems='baseline' flexWrap='wrap' >
                                                                    {card.skills ? card.skills.map((skill, index) => (
                                                                        <Tag minW='60px' maxW='auto' key={index} variant='solid' colorScheme='teal'>
                                                                            {skill.skillName}
                                                                        </Tag>
                                                                    )) : <Text>No Skill added</Text>}
                                                                </VStack>
                                                            </AccordionPanel>
                                                        </>
                                                    )}
                                                </AccordionItem>
                                            </Accordion>
                                        </CardBody>
                                        <Divider />
                                        <CardBody py={0}>
                                            <Favourite detailCard={card} />
                                        </CardBody>
                                        <Divider />
                                        <CardBody py={0}>
                                            <TransitionExample name={card.firstName} detailCard={card} />
                                        </CardBody>
                                        {/* <CardBody>
                            <Accordion allowMultiple>
                                <AccordionItem>
                                    {({ isExpanded }) => (
                                        <>
                                            <h2>
                                                <AccordionButton>
                                                    <Box as="span" flex='1' color='blue' textAlign='left'>
                                                        Candidate Details
                                                    </Box>
                                                    {isExpanded ? (
                                                        <MinusIcon fontSize='12px' />
                                                    ) : (
                                                        <AddIcon fontSize='12px' />
                                                    )}
                                                </AccordionButton >
                                            </h2>
                                            <AccordionPanel pb={4}>
                                                <AboutSection card={card} />
                                            </AccordionPanel>
                                        </>
                                    )}
                                </AccordionItem>
                            </Accordion>
                        </CardBody> */}
                                    </Card>

                                ))}
                            </InfiniteScroll>
                        </Stack>
                    </Box>
                    :
                    <Box display='flex' justifyContent='center' h='100%' w='100%'>
                        <Text>No <b>{name}</b> candidate</Text>
                    </Box>
            }
        </>
    );
}

export default CandidateCard;


function AboutSection({ card }) {
    return (
        <>
            {card !== undefined ?
                (
                    <Container maxW='container.lg' p={0} >
                        <Flex h="auto" py={0}>
                            <Box color='#68717A'>
                                <VStack flexDirection='column' alignItems='flex-start'>
                                    <Heading as='h4' size='sm'>About</Heading>
                                </VStack>
                                <VStack py={2} alignItems='flex-start'>
                                    <Heading as='h6' size='xs'>DOB</Heading>
                                    <Text> {card.dateOfBirth}</Text>
                                </VStack>
                                <VStack py={2} alignItems='flex-start'>
                                    <Heading as='h6' size='xs'>Degree</Heading>
                                    <Text>
                                        <span>- {card.degree}</span>
                                    </Text>
                                </VStack>
                                {card.experience &&
                                    (
                                        <VStack py={2} alignItems='flex-start'>
                                            <Heading as='h6' size='xs'>Experience</Heading>
                                            <Text>
                                                Proffessional experience- {card.experience.pExperience}
                                            </Text>
                                            <Text>
                                                relavent experience- {card.experience.relavent}
                                            </Text>
                                        </VStack>
                                    )
                                }
                                <VStack py={2} alignItems='flex-start'>
                                    <Heading as='h6' size='xs'>Languages</Heading>
                                    {
                                        card.languages ?
                                            card.languages.map((data) =>
                                            (
                                                <Text> {data.languageName}</Text>
                                            )
                                            ) : <></>}
                                </VStack>
                                <VStack py={2} alignItems='flex-start'>
                                    <Heading as='h6' size='xs'>Skills</Heading>
                                    {
                                        card.skills ?
                                            card.skills.map((data, index) =>
                                            (
                                                <Text> {index + 1}.{data.skillName}({data.skillType})</Text>
                                            )
                                            ) : <> </>}
                                </VStack>
                            </Box>
                        </Flex>
                    </Container>
                ) : <></>}

        </>
    )
}