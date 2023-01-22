import { Box, Divider, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Select } from '@chakra-ui/react'
import FilterSelect from '../Select/filterSelcet';



function CandidateFilter({searchData}) {
    const skills = ['HTML','CSS','JS']
    const [specialization , setSpecialization] = useState([]);
    const [experience , setExperience] = useState([]);
    // const specialization = ['fullstack', 'frontend']

 
    console.log(searchData,'searchData');

    useEffect(() => {
        let res = [];
        let exp = [];
        setExperience([]);
        setSpecialization([])
        console.log('running');
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
    },[searchData])
    
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