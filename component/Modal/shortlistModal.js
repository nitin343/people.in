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
} from '@chakra-ui/react'

function TransitionExample({name}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <IconButton
                size='sm'
                variant='outline'
                colorScheme='teal'
                aria-label='Send email'
                title='invite'
                onClick={onOpen}
                icon={<EmailIcon />}
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
                        <Button variant='ghost'>Proceed</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TransitionExample;