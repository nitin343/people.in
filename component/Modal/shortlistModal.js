import { AddIcon, EmailIcon, MinusIcon } from '@chakra-ui/icons';
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,useDisclosure,IconButton,Button,Text,Box} from '@chakra-ui/react';
import { deleteField, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { useFetchFavorites } from '../../hooks/fetchFavorites';
import { REMOVE_INT, SET_INT } from '../../Redux/reducers/interviewCandidate';
import { Spinner } from '@chakra-ui/react'
import { useFetchInterview } from '../../hooks/fetchInterview';

function TransitionExample({ name, detailCard }) {
    const {currentUser} = useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isShortListed, setIsShortListed] = useState(false);
    const interviewDetails = useSelector((state) => state.interviewCandidate.data)
    const dispatch = useDispatch();
    const { loading} = useFetchFavorites();
    const [loadingData, setLoadingData] = useState(false)
    const {interviewData} = useFetchInterview();

    useEffect(() => {
        setTimeout(() => {
            setIsShortListed(false)
            interviewData.forEach((item) => {
                if (item.id == detailCard.id) {
                    setLoadingData(false)
                    setIsShortListed(true)
                }else{
                    setLoadingData(false)
                }
            })
            setLoadingData(false)
        }, 1000);
    }, [ interviewData])


   async function onProceed(event) {
    event.stopPropagation();
    setLoadingData(true)
        dispatch(SET_INT(detailCard))
        const useRef =  doc(db , 'user', currentUser.uid) 
        await setDoc(useRef , {
            'interviewCandidate': {
                [detailCard.id]: detailCard
            }
        },{merge: true})                            
        onClose();
    }
    async function onDelete(event) {
        event.stopPropagation();
        setLoadingData(true)
        dispatch(REMOVE_INT(detailCard))
        const useRef =  doc(db , 'user', currentUser.uid) 
        await setDoc(useRef , {
            'interviewCandidate': {
                [detailCard.id]: deleteField(),
            }
        },{merge: true})
        onClose();
    }

    return (
        <>
            <Button onClick={onOpen} colorScheme='teal' px='8px' py='16px' variant='link' w='100%'>
                <Box as="span" flex='1' fontSize='16px' fontWeight='normal' color={'blue'} textAlign='left'>
                    Invite for Interview
                </Box>
                { !loading ?
                isShortListed ? (
                        <MinusIcon fontSize='12px' />
                    ) : (
                        <AddIcon fontSize='12px' />
                    ) : 
                    <Spinner
                            thickness='2px'
                            speed='0.35s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='sm' />
                    }
            </Button >
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>ShortList</ModalHeader>
                    <ModalCloseButton />


                    {
                        isShortListed
                            ?
                            <>
                                <ModalBody>
                                    <Text size='sm'>Schedule a call with <b>{name}</b> for further process</Text>
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} variant='ghost' onClick={(e) => onClose(e)}>Schedule a Call</Button>
                                    <Button variant='ghost' onClick={onDelete}>Remove</Button>
                                </ModalFooter>
                            </>
                            :
                            <>
                                <ModalBody>
                                    <Text size='sm'>Are you sure, Do you want to Shortlist <b>{name}</b> for further process</Text>
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button variant='ghost' onClick={(e) => onProceed(e)}>Proceed</Button>
                                </ModalFooter>
                            </>
                    }
                </ModalContent>
            </Modal>
        </>
    )
}

export default TransitionExample;