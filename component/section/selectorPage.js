import { Box, Button, Container, filter, Flex, Spinner, VStack } from '@chakra-ui/react';
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
import axios from 'axios';

function SelectorPage({ apiDataQl }) {

    const [apiData, setApiData] = useState([])
    const [candidateDetail, setCandidateDetail] = useState()
    const [pickerItems, setPickerItems] = useState([{ label: 'Loading...' }]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [favoriteCandidate, setFavoritecandidate] = useState([])
    const [interviewCandidateData, setInterviewCandidateData] = useState([])
    const [searchData, setSearchData] = useState([])
    const [filterData, setFilterData] = useState([])
    const [apiLoading, setApiLoading] = useState(false)
    const { currentUser } = useAuth();
    const { favorite } = useFetchFavorites();
    const { interviewData } = useFetchInterview();
    const interviewDetail = useSelector((state) => state.interviewCandidate.data)
    const favioritesDetail = useSelector((state) => state.favorites.data)
    const filterCandidateDetail = useSelector((state) => state.filterCandidate.data)
    let searchedCandidate = [];
    let previousFilter = filterCandidateDetail;

    useEffect(() => {
        fetchApiData()
    }, [])



    const router = useRouter();
    const query = router.query;
    const name = query.page;

    useEffect(() => {
        setFavoritecandidate(favorite)
        setFilterData(favorite)
    }, [name, favioritesDetail])

    useEffect(() => {
        setInterviewCandidateData(interviewData)
        setFilterData(interviewData)
    }, [name, interviewDetail])

    useEffect(() => {
        let candidatName = searchData.map((data) => {
            return { value: data.firstName + ' ' + data.lastName, label: data.firstName + ' ' + data.lastName }
        })
        setPickerItems(candidatName)
    }, [name, searchData, selectedItems])

    useEffect(() => {
        switch (name) {
            case 'Favorites':
                setSelectedItems([])
                setSearchData(favorite)
                return setFavoritecandidate(favorite);
            case 'Interview':
                setSelectedItems([])
                setSearchData(interviewData)
                return setInterviewCandidateData(interviewData);
            default:
                break;
        }
    }, [name, interviewData, favorite])

    useEffect(() => {
        switch (name) {
            case 'Search':
                setSelectedItems([])
                setFilterData(apiData)
                setSearchData(apiData)
                return setCandidateDetail(apiData)
            default:
                break;
        }
    }, [name, apiData])

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

    const fetchApiData = async () => {
        setApiLoading(true);
        return await axios({
            url: 'http://peoplein.ap-northeast-2.elasticbeanstalk.com/graphql',
            method: 'post',
            headers: {
                'Content-Security-Policy':'upgrade-insecure-requests'
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlzcyI6ImhhYnNpZGEtcGVvcGxlaW4iLCJleHAiOjE2ODAwOTUzMTYsImlhdCI6MTY3OTQ5MDUxNn0.OEk51Ce2eQctbG8imtcpXe3_orhHmPOztFrFlYhJR5o',
                'Content-Type': 'application/json',


            },
            data: {
                query: `{
                    getAllApplicants {
                        id
                        firstName
                        lastName
                        country
                        gender
                        visa
                        dateOfBirth
                        degree
                        yearsOfExperience
                        resumeGoogleDrivePath
                        languages{
                            languageName
                        }
                        skills{
                            skillName
                            skillType
                        }
                        
                    }
                }`
            }
        }).then((result) => {
            setApiData(result.data.data.getAllApplicants)
            setApiLoading(false)
        }).catch((error) => {
            setApiData(candidate.data.getApplicant)

        });
    }


    const handleSelectedItemsChange = (selectedItems, changes, searchName) => {

        if (searchName == 'searchBar') {
            if (changes) {
                if (changes.selectedItems) {
                    setSelectedItems(selectedItems);
                }



                selectedItems.map((data) => {
                    searchData.map((cd) => {
                        if (data.label === cd.firstName + ' ' + cd.lastName) {
                            searchedCandidate.push(cd)
                        }
                    })
                })
            }
            setCandidateDetail(searchedCandidate)
        }

        if (searchName == 'filters') {

            let filterData = searchData;
            // if (filterCandidateDetail.experience && filterCandidateDetail.skills && filterCandidateDetail.languages) {

            //     searchData.map((data) => {

            //         if (data.Specialization == filterCandidateDetail.specialitaion || data.yearsOfExperience == filterCandidateDetail.experience) {
            //             if (filterCandidateDetail.skills) {
            //                 data.skills.map((item) => {
            //                     if (item.skillName == filterCandidateDetail.skills) {
            //                         if (filterCandidateDetail.languages) {
            //                             data.languages.map((item) => {
            //                                 if (item.languageName == filterCandidateDetail.languages) {
            //                                     filterData.push(data)
            //                                 }
            //                             })
            //                         } else {
            //                             filterData.push(data)
            //                         }
            //                     }
            //                 })
            //             } else {
            //                 filterData.push(data)
            //             }
            //         }
            //     })

            // } else if (filterCandidateDetail.specialitaion) {

            //     searchData.map((data) => {
            //         if (data.Specialization == filterCandidateDetail.specialitaion) {
            //             filterData.push(data)
            //         }
            //     })

            // } else if (filterCandidateDetail.experience) {
            //     searchData.map((data) => {
            //         if (data.yearsOfExperience == filterCandidateDetail.experience) {
            //             filterData.push(data)
            //         }
            //     })

            // } else if (filterCandidateDetail.skills) {
            //     searchData.map((data) => {
            //         data.skills.map((item) => {
            //             if (item.skillName == filterCandidateDetail.skills) {
            //                 filterData.push(data)
            //             }
            //         })
            //     })
            // } else if (filterCandidateDetail.languages) {
            //     searchData.map((data) => {
            //         data.languages.map((item) => {
            //             if (item.languageName == filterCandidateDetail.languages) {
            //                 filterData.push(data)
            //             }
            //         })
            //     })
            // }
            // else {
            //     switch (name) {
            //         case 'Favorites':
            //             filterData = favorite
            //             break;
            //         case 'Interview':
            //             filterData = interviewData
            //             break;
            //         case 'Search': 
            //              filterData = apiData
            //         default:
            //             break;
            //     }
            // }

            if (filterCandidateDetail.experience || filterCandidateDetail.skills || filterCandidateDetail.languages) {

                if (filterCandidateDetail.experience) {
                    // filterData = [];
                    let filterExperience = []
                    if (filterCandidateDetail.skills || filterCandidateDetail.languages || (filterCandidateDetail.languages && filterCandidateDetail.skills)) filterExperience = filterData
                    // else if (filterCandidateDetail.experience) filterExperience = searchData
                    else filterExperience = searchData;
                    if (filterExperience.length > 0) {
                        filterData = []
                        filterExperience.map((data) => {
                            if (data.yearsOfExperience == filterCandidateDetail.experience) {
                                return filterData.push(data)
                            }
                        })
                    }
                }

                if (filterCandidateDetail.skills) {
                    console.log(filterData, 'filter data');
                    let filterSkills = []
                    if (filterCandidateDetail.experience || filterCandidateDetail.languages || (filterCandidateDetail.experience && filterCandidateDetail.languages)) filterSkills = filterData
                    else filterSkills = searchData

                    if (filterSkills.length > 0) {
                        console.log(filterSkills, 'filter data 1');
                        filterData = [];
                        filterSkills.map((data) => {
                            data.skills.map((item) => {
                                if (item.skillName == filterCandidateDetail.skills) {
                                    filterData.push(data)
                                }
                            })
                        })
                        console.log(filterData, 'filter data 2');
                    }
                }


                if (filterCandidateDetail.languages) {
                    console.log('filterData', filterData);
                    let filterLanguages = []
                    if (filterData.length > 0 || filterCandidateDetail.experience || filterCandidateDetail.skills || (filterCandidateDetail.experience && filterCandidateDetail.skills)) filterLanguages = filterData
                    else filterLanguages = searchData
                    console.log('filtet language', filterLanguages);
                    if (filterLanguages.length > 0) {
                        filterData = [];
                        filterLanguages.map((data) => {
                            data.languages.map((item) => {
                                if (item.languageName == filterCandidateDetail.languages) {
                                    filterData.push(data)
                                }
                            })
                        })
                    }
                }
            }

            searchedCandidate = filterData;
            // setSearchData(filterData)
        }

        if (searchedCandidate.length == 0 && searchName == 'searchBar' && selectedItems == 0) {
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
                    // setSearchData(searchedCandidate)
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

                {apiData &&

                    (
                        <>
                            <Box
                                w={['100%', '100%', '100%', '50%']}
                                height={{ base: 'auto', md: '100vh' }}
                                p={4}
                                my={1}
                                spacing={10}
                                alignItems="flex-start"

                            >
                                <NavigationPage searchData={searchData} filterData={filterData} />
                                <Button width={{ base: '100%', md: '95%' }} mt={{ base: '0px', md: '0px' }} colorScheme='blue' size='md' onClick={() => handleSelectedItemsChange('', '', 'filters')}>Search Filter</Button>
                            </Box>
                            <Box
                                width={{ base: "100%", lg: 'full' }}
                                h="full"
                                p={{ base: '0', lg: '4' }}
                                spacing={10}
                                alignItems="flex-start"
                                mt={2}
                            >

                                <VStack color='#8F6AF8' height='50px' borderRadius='2px' bgColor='#F8F9FA' justifyContent='center' alignItems='flex-start' border='1px solid pink' mt='2' px='2'>
                                    <span>
                                        Home / {name} {selectedItems.length !== 0 ? <span> / Result</span> : <></>}
                                    </span>
                                </VStack>

                                <ChakraProvider>
                                    <Box py={4} >
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

                        </>
                    )}
                {/* {Favname.id} */}
            </Flex>
        </Container>
    );
}

export default SelectorPage;





