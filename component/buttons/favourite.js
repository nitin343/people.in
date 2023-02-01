import { AddIcon, MinusIcon, StarIcon } from '@chakra-ui/icons';
import { Box, Button, IconButton } from '@chakra-ui/react';
import { deleteField, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { useFetchFavorites } from '../../hooks/fetchFavorites';
import { REMOVE_FAV, SET_FAV } from '../../Redux/reducers/faviorites';
import { Spinner } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'


function Favourite({ detailCard }) {
    // const [favColor, setFavColor] = useState();
    const { currentUser } = useAuth();
    const [isFav, setIsFav] = useState(false);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const { error, favorite } = useFetchFavorites();
    const favioritesDetail = useSelector((state) => state.favorites.data)

    const toast = useToast()
    const toastIdRef = React.useRef();

    useEffect(() => {
        setTimeout(() => {
            setIsFav(false)
        
            favorite.forEach((item) => {
                if (item.id == detailCard.id) {
                    setLoading(false)
                    setIsFav(true)
                } else {
                    setLoading(false)
                }
            })
        
            setLoading(false)
        }, 0);
    }, [favorite])


    async function dispatchAction(event) {
        event.stopPropagation();
        setLoading(true)
        if (isFav) {
            dispatch(REMOVE_FAV(detailCard))
            const useRef = doc(db, 'user', currentUser.uid)
            await setDoc(useRef, {
                'favoriteCandidate': {
                    [detailCard.id]: deleteField(),
                }
            }, { merge: true })
            removeToast();
        } else {
            dispatch(SET_FAV(detailCard))
            const useRef = doc(db, 'user', currentUser.uid)
            await setDoc(useRef, {
                'favoriteCandidate': {
                    [detailCard.id]: detailCard,
                }
            }, { merge: true })
            addToast()
        }
    }

    function addToast() {
        toastIdRef.current = toast({ description: `added ${detailCard.firstName} to favorite list` ,  status: 'success', })
    }

    function removeToast(){
        toastIdRef.current = toast({description: `removed ${detailCard.firstName} from favorite` , status: 'info'})
    }


    return (
        <>
            {
                <Button onClick={(e) => dispatchAction(e)} colorScheme='teal' px='8px' py='16px' variant='link' w='100%'>
                    <Box as="span" flex='1' fontSize='16px' fontWeight='normal' color={'blue'} textAlign='left'>
                        Add to Favorites
                    </Box>
                    {!loading ?
                        isFav ?
                            (
                                <MinusIcon fontSize='12px' />
                                
                            ) : (
                                <AddIcon fontSize='12px' />
                            )
                        :
                        <Spinner
                            thickness='2px'
                            speed='0.35s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='sm' />
                    }
                </Button >
            }
        </>
    );
}

export default Favourite;