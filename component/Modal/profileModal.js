import { DownloadIcon, MinusIcon, ViewIcon } from '@chakra-ui/icons'
import { Modal, Container, Image, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button, Text, Stack, Heading, Box, VStack, Divider, HStack } from '@chakra-ui/react'
import Link from 'next/link'
// import Image from 'next/image'

import React from 'react'
import Favourite from '../buttons/favourite'
import TransitionExample from './shortlistModal'


function ProfileModal({ card }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <ViewIcon onClick={onOpen} size='sm' colorScheme='teal' variant='outline' />

            <Modal onClose={onClose} size='full' motionPreset='slideInBottom' isOpen={isOpen} scrollBehavior='outside'>
                <ModalOverlay />
                <ModalContent overflowY='scroll' w='full' h='full'>
                    <Box my={10} height='10%'>
                        <ModalCloseButton />
                    </Box>
                    <ModalBody>
                        <Box w='100%' h='auto' border='1px solid pink' px={2}>
                            <Box w='100%' h='25%' my={1} bgColor='teal.200' display='flex' alignItems='flex-start'>
                                <VStack w='100%' bgColor='teal.200' my='0.6%' h='30%' alignItems={{ base: 'center', md: 'flex-start' }} >
                                    <Image
                                        objectFit='contain'
                                        boxSize='200px'
                                        bgColor='teal.200'
                                        w={{ base: '80%', md: '60%', lg: '50%' }}
                                        src={card.profileImage ? card.profileImage : ''}
                                        alt='Dan Abramov'
                                    />
                                </VStack>
                            </Box>
                            <Box border='1px solid pink' display='flex' flexDirection={{ base: 'column', md: 'row' }}>
                                <VStack mt='1' w={{ base: '100%', md: '50%' }} spacing='3' >
                                    <Heading color='#152536' fontSize='20px'> {card.firstName} {card.lastName}</Heading>
                                    <Text fontSize='16px' color='#68717A'>{card.Specialization}</Text>
                                </VStack>
                                <VStack mt='1' w={{ base: '100%', md: '50%' }} spacing='3' color='#68717A' fontSize='16px' justifyContent='space-around' alignItems={{ base: 'center', md: 'baseline' }} flexDirection={{ base: 'column', md: 'row' }}>
                                    <Text title={card.country}>Nationality: <span> {card.country} </span></Text>
                                    <Text title={card.visa}>Visa: <span> {card.visa} </span></Text>
                                    <Text title={card.gender}>Gender: <span> {card.gender} </span></Text>
                                </VStack>
                            </Box>
                            <Favourite detailCard={card} />
                            <Divider />
                            <TransitionExample detailCard={card} />
                            <Divider />
                            {
                                card &&
                                <Box color='#68717A'>
                                    <VStack flexDirection='column' alignItems='flex-start'>
                                        <Heading as='h1' size='sm'>About</Heading>
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
                                    <Divider />
                                    <HStack py={2} flex='1' alignItems="flex-start"  justifyContent='space-between'>
                                        <Link   href={card.resumeGoogleDrivePath ? card.resumeGoogleDrivePath : ''} target="_blank">
                                            <Button  colorScheme='teal' px='8px' py='16px' variant='link' w='100%'>
                                                <Box as="span" flex='1' fontSize='16px' fontWeight='normal' color={'blue'} textAlign='left'>
                                                    Download Resume
                                                </Box>
                                            </Button >
                            
                                        </Link>
                                    </HStack>
                                </Box>
                            }
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal;