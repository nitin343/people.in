import { Box, Divider, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Select } from '@chakra-ui/react'
import FilterSelect from '../Select/filterSelcet';
import { Router, useRouter } from 'next/router';




function CandidateFilter({searchData}) {
    const [specialization , setSpecialization] = useState([]);
    const [experience , setExperience] = useState([]);

    const router = useRouter();
    const query = router.query;
    const name = query.page;
 

    useEffect(() => {
        let res = [];
        let exp = [];
        setExperience([]);
        setSpecialization([])
        for (let i = searchData.length; i--;){
               if (res.indexOf(searchData[i].Specialization) < 0) {
                res.push(searchData[i].Specialization);
               };
               if (exp.indexOf(searchData[i].yearsOfExperience) < 0) {
                exp.push(searchData[i].yearsOfExperience);
               };
            }
            if(res.length > 0 ){
                setSpecialization(res)
                setExperience(exp)
            }
    },[searchData, name])
    
    return (
        <Box w='95%' borderRadius={2} border='1px solid pink'>
            <HStack fontSize='16px' color='#212529' p={2}>
                <Text>Filter</Text>
            </HStack>
            <Divider />
             <Stack m={2} >
                  <FilterSelect placeHolder={'Specialization'} optionValue={specialization} SelectName={'specialization'}/>
             </Stack>
             <Stack m={2}>
                  <FilterSelect placeHolder={'Experience'} optionValue={experience} SelectName={'experience'}/>
             </Stack>
         </Box>
    );
}

export default CandidateFilter;