import { Box, Button, Container, filter, Flex, VStack } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import NavigationPage from './navigation';
import CandidateCard from '../card/candidateCard';
import Router, { useRouter } from "next/router";
import { candidate } from '../../data/candidates';
import { ChakraProvider } from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFetchFavorites } from '../../hooks/fetchFavorites';
import { useAuth } from '../../context/AuthContext';
import { useFetchInterview } from '../../hooks/fetchInterview';
import CandidateFilter from './CandidatrFilter';

function SelectorPage() {

    const [apiData, setApiData] = useState(candidate.data.getApplicant)
    const [candidateDetail, setCandidateDetail] = useState()
    const [pickerItems, setPickerItems] = useState([{ label: 'Loading...' }]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [favoriteCandidate, setFavoritecandidate] = useState([])
    const [interviewCandidateData, setInterviewCandidateData] = useState([])
    const [searchData, setSearchData] = useState(candidate.data.getApplicant)
    const { currentUser } = useAuth();
    const { favorite } = useFetchFavorites();
    const { interviewData } = useFetchInterview();
    const interviewDetail = useSelector((state) => state.interviewCandidate.data)
    const favioritesDetail = useSelector((state) => state.favorites.data)
    const filterCandidateDetail = useSelector((state) => state.filterCandidate.data)
    let searchedCandidate = [];
    let previousFilter = filterCandidateDetail;


    const router = useRouter();
    const query = router.query;
    const name = query.page;

    useEffect(() => {
        setFavoritecandidate(favorite)
    }, [name, favioritesDetail])

    useEffect(() => {
        setInterviewCandidateData(interviewData)
    }, [name, interviewDetail])

    useEffect(() => {
        let candidatName = searchData.map((data) => {
            return { value: data.firstName, label: data.firstName }
        })
        setPickerItems(candidatName)
    }, [name, searchData, selectedItems])

    useEffect(() => {
        switch (name) {
            case 'Search':
                setSelectedItems([])
                setSearchData(candidate.data.getApplicant)
                return setCandidateDetail(candidate.data.getApplicant)
            case 'Favorites':
                setSelectedItems([])
                setSearchData(favorite)
                return setFavoritecandidate(favorite);
            case 'Interview':
                setSelectedItems([])
                setSearchData(interviewData)
                return setInterviewCandidateData(interviewData);
            default:
                return setCandidateDetail(candidate.data.getApplicant);
        }
    }, [name, interviewData, favorite])

    const pageRender = () => {
        switch (name) {
            case 'Search':
                return <CandidateCard candidateDetail={candidateDetail} />
            case 'Favorites':
                return <CandidateCard candidateDetail={favoriteCandidate} />
            case 'Interview':
                return <CandidateCard candidateDetail={interviewCandidateData} />
            default:
                Router.push({ pathname: '/esd', query: { "page": 'Search' } })
                break;
        }
    }



    const handleSelectedItemsChange = (selectedItems, changes, searchName) => {

        if (searchName == 'searchBar') {
            if (changes) {
                if (changes.selectedItems) {
                    setSelectedItems(selectedItems);
                }



                selectedItems.map((data) => {
                    searchData.map((cd) => {
                        if (data.label === cd.firstName) {
                            searchedCandidate.push(cd)
                        }
                    })
                })
            }
        }

        if (searchName == 'filters') {
            let filterData = [];
            if (filterCandidateDetail.specialitaion && filterCandidateDetail.experience) {

                searchData.map((data) => {
                    if (data.Specialization == filterCandidateDetail.specialitaion && data.yearsOfExperience == filterCandidateDetail.experience) {
                        filterData.push(data)
                    }
                })
                   
            } else if (filterCandidateDetail.specialitaion) {

                searchData.map((data) => {
                    if (data.Specialization == filterCandidateDetail.specialitaion) {
                        filterData.push(data)
                    }
                })

            } else if (filterCandidateDetail.experience) {
                searchData.map((data) => {
                    if (data.yearsOfExperience == filterCandidateDetail.experience) {
                        filterData.push(data)
                    }
                })
            }else{
                switch (name) {
                    case 'Favorites':
                        filterData = favorite
                        break;
                    case 'Favorites':
                        filterData = interviewData
                        break;
                    default:
                        break;
                }
            }
            
            // console.log(filterDa);
            searchedCandidate = filterData;
        }

        if (searchedCandidate.length == 0 && searchName=='searchBar' && selectedItems == 0) {
            switch (name) {
                case 'Search':
                    setCandidateDetail(apiData)
                    break;
                case 'Favorites':
                    setFavoritecandidate(favorite)
                    break;
                case 'Interview':
                    setInterviewCandidateData(interviewData)
                    break;
                default:
                    break;
            }
        } else {
            switch (name) {
                case 'Search':
                    setCandidateDetail(searchedCandidate)
                    break;
                case 'Favorites':
                    setFavoritecandidate(searchedCandidate)
                    break;
                case 'Interview':
                    setInterviewCandidateData(searchedCandidate)
                    break;
                default:
                    break;
            }
        }

    };

    return (
        <Container maxW="container.xl" p={0} >
            <Flex direction={{ base: 'column', md: 'row' }} h="100%" py={0} >
                {/* {Favname.id} */}
                <Box
                    w={['100%', '100%', '100%', '50%']}
                    height={{ base: 'auto', md: '100vh' }}
                    p={4}
                    my={1}
                    spacing={10}
                    alignItems="flex-start"
                    
                >
                    <NavigationPage searchData={searchData} />

                    <Button width='95%' colorScheme='blue' size='md' onClick={() => handleSelectedItemsChange('', '', 'filters')}>Search Filter</Button>
                </Box>
                <Box
                    width={{ base: "100%", lg: 'full' }}
                    h="full"
                    p={{ base: '0', lg: '4' }}
                    spacing={10}
                    alignItems="flex-start"
                    mt={2}
                >
                    <ChakraProvider>
                        <Box px={8} py={4} >
                            <CUIAutoComplete
                                label="Search for your preferred Candidates"
                                placeholder="Candidate Name"
                                // onCreateItem={handleCreateItem}
                                items={pickerItems}
                                tagStyleProps={{
                                    rounded: "full",
                                    pt: 1,
                                    pb: 2,
                                    px: 2,
                                    fontSize: "1rem"
                                }}
                                selectedItems={selectedItems}
                                onSelectedItemsChange={(changes) =>
                                    handleSelectedItemsChange(changes.selectedItems, changes, 'searchBar')
                                }
                            />
                        </Box>
                    </ChakraProvider>

                    <VStack height={{ base: 'auto', md: '100%' }} display='flex'>
                        <>
                            {
                                pageRender()
                            }
                        </>
                    </VStack>

                </Box>
            </Flex>
        </Container>
    );
}

export default SelectorPage;