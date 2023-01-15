import React, { Fragment, useEffect, useState } from 'react';
import { Card, Container, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, ButtonGroup, Button, Divider, Box, VStack, IconButton, Flex, keyframes } from '@chakra-ui/react'
import { candidate } from '../../data/candidates';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel} from '@chakra-ui/react'
import { AddIcon, DownloadIcon, EmailIcon, MinusIcon, StarIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import TransitionExample from '../Modal/shortlistModal';
import { useDispatch } from 'react-redux';
import { SET_FAV } from '../../Redux/reducers/faviorites';
import Router,{ useRouter } from 'next/router';
import Favourite from '../buttons/favourite';
import styles from '../../styles/Home.module.css'


const animation = keyframes`
from {
    box-shadow: .8px .9px 3px grey;
    --webkit-transition:  box-shadow 5s ease-out;
}

to{
    box-shadow: 1px 8px 20px grey;
    --webkit-transition:  box-shadow 5s ease-in;
}
`

function CandidateCard({candidateDetail}) {

    const [candidateProfile, setCandidateProfile] = useState(candidateDetail);
    const myAnimation = `${animation} infinite 5s`

    useEffect(() => {
        //    console.log(candidateDetail);
           setCandidateProfile(candidateDetail)
    },[candidateDetail])

    const router = useRouter();
    const query = router.query;
    const name = query.page;

    return (
        <>
        { 
            candidateProfile !== undefined && candidateProfile.length > 0 ?
            <Box display='flex' flexWrap='wrap' h='70vh' overflowY='scroll' alignItems='flex-start' w='full' >
           { candidateProfile.map((card , index) => (
                    <Card _hover={{animation: myAnimation}}  key={card.id} width={{base:'100%' , lg:'47%'}} h='auto' my='10px' mx={2} spacing={5}>
                        <CardHeader >
                            <Box  w='100%' h='100%' display='flex' flexDirection='row' alignContent='flex-start'>
                                <VStack w='45%'>
                                    <Image
                                        boxSize='100px'
                                        objectFit='cover'
                                        src={card.profileImage ? card.profileImage : '' }
                                        alt='Dan Abramov'
                                    />
                                </VStack>
                                <VStack w='50%' px={1} color='#ABB5BE' fontSize='sm' justifyContent='center' alignItems='flex-start' h='100%'>
                                    <Text noOfLines={[1, 2]} title={card.country}>Nationality: <span> {card.country} </span></Text>
                                    <Text title={card.visa}>Visa: <span> {card.visa} </span></Text>
                                    <Text title={card.gender}>Gender: <span> {card.gender} </span></Text>
                                </VStack>
                            </Box>
                        </CardHeader>
                        <CardBody>
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'> {card.firstName} {card.lastName}</Heading>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardBody  >
                            <ButtonGroup spacing='2' display='flex' justifyContent='space-evenly'>
                               <Favourite detailCard={card}/>
                               <TransitionExample name={card.firstName} detailCard={card} />
                                <Link href={card.resumeGoogleDrivePath ? card.resumeGoogleDrivePath : '' } target="_blank">
                                    <IconButton
                                        size='sm'
                                        variant='outline'
                                        colorScheme='teal'
                                        aria-label='Download resume'
                                        title='view Resume'
                                        icon={<DownloadIcon />}
                                    />
                                </Link>
                            </ButtonGroup>
                        </CardBody>
                        <Divider />
                        <CardBody>
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
                        </CardBody>
                    </Card>

                ))}
            </Box>
                :
                <Box  display='flex' justifyContent='center' h='100%' w='100%'>
               
                <Text>No <b>{name}</b> candidate</Text>
               
                </Box>
            }
            </>
    );
}

export default CandidateCard;


function AboutSection({ card}) {
    return (
        <>
            {card !== undefined ? 
                (
                    <Container  maxW='container.lg' p={0} >
                        <Flex h="auto" py={0}>
                            <Box  color='#68717A'>
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
                                    card.languages  ?
                                    card.languages.map((data) =>
                                    (
                                        <Text> {data.languageName}</Text>
                                    )
                                    ) : <></>}
                                </VStack>
                                <VStack py={2} alignItems='flex-start'>
                                    <Heading as='h6' size='xs'>Skills</Heading>
                                    {
                                    card.skills  ?
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