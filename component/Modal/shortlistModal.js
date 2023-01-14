import { EmailIcon } from '@chakra-ui/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Button,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_INT, SET_INT } from '../../Redux/reducers/interviewCandidate';

function TransitionExample({name , detailCard}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [slColor , setSlColor] = useState('none')
    const [isShortListed, setIsShortListed] = useState(false);
    const interviewDetails = useSelector((state) => state.interviewCandidate.data)

    const dispatch = useDispatch();

    
    useEffect(() => {
        setIsShortListed(false)
        setSlColor('none')
        interviewDetails.forEach((item) => {
           if(item.id == detailCard.id){
            setIsShortListed(true)
            setSlColor('red')
           }
        })   
    },[interviewDetails])


   function onProceed (){
     dispatch(SET_INT(detailCard))
     onClose();
   }
   function onDelete (){
     dispatch(REMOVE_INT(detailCard))
     onClose();
   }

    return (
        <>
            <IconButton
                size='sm'
                variant='outline'
                colorScheme='teal'
                aria-label='Send email'
                title='invite'
                onClick={onOpen}
                icon={<EmailIcon color={slColor}/>}
            />
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
                    <ModalBody>
                       <Text size='sm'>Are you sure, Do you want to Shortlist <b>{name}</b> for further process</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        {
                        isShortListed 
                        ?
                        <Button variant='ghost' onClick={onDelete}>delete</Button>
                        :
                        <Button variant='ghost' onClick={onProceed}>Proceed</Button>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TransitionExample;