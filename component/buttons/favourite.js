import { StarIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_FAV, SET_FAV } from '../../Redux/reducers/faviorites';

function Favourite({detailCard}) {
    // const [favColor, setFavColor] = useState();
    const [isFav, setIsFav] = useState(false);
    const dispatch = useDispatch();
    const favioritesDetail = useSelector((state) => state.favorites.data)

    useEffect(() => {
        console.log('change');
        setIsFav(false)
        favioritesDetail.forEach((item) => {
           if(item.id == detailCard.id){
            setIsFav(true)
           }
        })   
    },[favioritesDetail])

    return (
        <>
        {
            isFav ?
            <IconButton
                size='sm'
                variant='outline'
                colorScheme='teal'
                aria-label='favorite'
                title='favorite'
                onClick={() => dispatch(REMOVE_FAV(detailCard))}
                icon={<StarIcon color='red' />}
            />
            :
            <IconButton
                size='sm'
                variant='outline'
                colorScheme='teal'
                aria-label='favorite'
                title='favorite'
                onClick={() => dispatch(SET_FAV(detailCard))}
                icon={<StarIcon color='none' />}
            />
        }
     </>
    );
}

export default Favourite;