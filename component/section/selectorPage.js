import { Box, Button, Container, Flex, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import NavigationPage from './navigation';
import CandidateCard from '../card/candidateCard';
import Router, { useRouter } from "next/router";
import { candidate } from '../../data/candidates';
import { ChakraProvider } from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


function SelectorPage() {

    const [apiData, setApiData] = useState(candidate.data.getApplicant)
    const [candidateDetail, setCandidateDetail] = useState()
    const [pickerItems, setPickerItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [favoriteCandidate, setFavoritecandidate] = useState([])
    const [interviewCandidateData, setInterviewCandidateData] = useState([])
    const [searchData, setSearchData] = useState(candidate.data.getApplicant)


    const interviewDetail = useSelector((state) => state.interviewCandidate.data)
    const favioritesDetail = useSelector((state) => state.favorites.data)
    let searchedCandidate = [];

    const router = useRouter();
    const query = router.query;
    const name = query.page;

    useEffect(() => {
        let candidatName = searchData.map((data) => {
            return { value: data.firstName, label: data.firstName }
        })
        setPickerItems(candidatName)
    }, [searchData])

    useEffect(() => {
        switch (name) {
            case 'Search':
                setSearchData(candidate.data.getApplicant)
                return setCandidateDetail(candidate.data.getApplicant)
            case 'Favorites':
                setSearchData(favioritesDetail)
                return setFavoritecandidate(favioritesDetail);
            case 'Interview':
                setSearchData(interviewDetail)
                return setInterviewCandidateData(interviewDetail);
            default:
                return setCandidateDetail(candidate.data.getApplicant);
        }
    }, [name, interviewDetail, favioritesDetail])

    const pageRender = () => {
        switch (name) {
            case 'Search':
                return <CandidateCard candidateDetail={candidateDetail} />
            case 'Favorites':
                return <CandidateCard candidateDetail={favoriteCandidate} />
            case 'Interview':
                return <CandidateCard candidateDetail={interviewCandidateData} />
            default:
                return <CandidateCard />
        }
    }

    const handleCreateItem = (item) => {
        setPickerItems((curr) => [...curr, item]);
        setSelectedItems((curr) => [...curr, item]);
    };

    const handleSelectedItemsChange = (selectedItems, changes) => {
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


            if (changes.selectedItems == 0) {
                switch (name) {
                    case 'Search':
                        setCandidateDetail(apiData)
                        break;
                    case 'Favorites':
                        setFavoritecandidate(favioritesDetail)
                        break;
                    case 'Interview':
                        setInterviewCandidateData(interviewDetail)
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
        }
    };

    return (
        <div>
            <Container maxW="container.xl" p={0}>
                <Flex direction={{ base: 'column', md: 'row' }} h="100%" py={0} >
                    {/* {Favname.id} */}
                    <Box
                        w={['100%', '100%', '100%', '50%']}
                        height={{ base: '50vh', md: '100vh' }}
                        p={4}
                        spacing={10}
                        alignItems="flex-start"
                    >
                        <NavigationPage />
                    </Box>
                    <Box
                        width={{ base: "100%", lg: 'full' }}
                        h="full"
                        p={{ base: '0', lg: '4' }}
                        spacing={10}
                        alignItems="flex-start"
                    >
                        <ChakraProvider>
                            <Box px={8} py={4}>
                                <CUIAutoComplete
                                    label="Search for your preferred Candidates"
                                    placeholder="Candidate Name"
                                    onCreateItem={handleCreateItem}
                                    items={pickerItems ? pickerItems : ''}
                                    tagStyleProps={{
                                        rounded: "full",
                                        pt: 1,
                                        pb: 2,
                                        px: 2,
                                        fontSize: "1rem"
                                    }}
                                    selectedItems={selectedItems}
                                    onSelectedItemsChange={(changes) =>
                                        handleSelectedItemsChange(changes.selectedItems, changes)
                                    }
                                />
                            </Box>
                        </ChakraProvider>

                        <VStack height='full' display='flex'>
                            <>
                                {
                                    pageRender()
                                }
                            </>
                        </VStack>

                    </Box>
                </Flex>
            </Container>
        </div>
    );
}

export default SelectorPage;