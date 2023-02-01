import { Box, Button, Divider, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Select } from '@chakra-ui/react'
import FilterSelect from '../Select/filterSelcet';
import { Router, useRouter } from 'next/router';




function CandidateFilter({searchData}) {
    const [specialization , setSpecialization] = useState([]);
    const [experience , setExperience] = useState([]);
    const [skills , setSkills] = useState([])
    const [languages , setLanguages] = useState([])

    const router = useRouter();
    const query = router.query;
    const name = query.page;
 

    useEffect(() => {
        let res = [];
        let exp = [];
        let skillset = [];
        let allLanguages = [];
        setExperience([]);
        setSpecialization([]);
        setSkills([]);
        if(searchData){
        for (let i = searchData.length; i--;){
               if (res.indexOf(searchData[i].Specialization) < 0) {
                res.push(searchData[i].Specialization);
               };
               if (exp.indexOf(searchData[i].yearsOfExperience) < 0) {
                exp.push(searchData[i].yearsOfExperience);
               };
               searchData[i].skills.map((item , index) => {
                   if (skillset.indexOf(item.skillName) < 0) {
                      skillset.push(item.skillName)
                   };
               })
               searchData[i].languages.map((item , index) => {
                   if (allLanguages.indexOf(item.languageName) < 0) {
                    allLanguages.push(item.languageName)
                   };
               })
            }
        }
            if(res.length > 0 ){
                setSpecialization(res)
                setExperience(exp)
                setSkills(skillset)
                setLanguages(allLanguages)
            }
    },[searchData, name])
    
    return (
        <Box w={{base:'100%', md:'95%'}} fontSize='15px'  borderRadius={2} border='1px solid pink'>
            <HStack fontSize='16px' color='#212529' p={2}>
                <Text>Filter</Text>
            </HStack>
            <Divider />
             <Stack my={2} >
                  <FilterSelect placeHolder={'Specialization'} optionValue={specialization} SelectName={'specialization'}/>
             </Stack>
             <Stack my={2}>
                  <FilterSelect  placeHolder={'Experience'} optionValue={experience} SelectName={'experience'}/>
             </Stack>
             <Stack my={2}>
                  <FilterSelect placeHolder={'Skills'} optionValue={skills} SelectName={'skills'}/>
             </Stack>
             <Stack my={2}>
                  <FilterSelect placeHolder={'Languages'} optionValue={languages} SelectName={'languages'}/>
             </Stack>
         </Box>
    );
}

export default CandidateFilter;