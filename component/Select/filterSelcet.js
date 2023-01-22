import React, { useEffect } from 'react';
import { Select } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { SET_FILTER_EXP, SET_FILTER_SPEC } from '../../Redux/reducers/candidateFilterReducer';

function FilterSelect({ placeHolder, optionValue, SelectName }) {
  console.log(optionValue);
  

  const dispatch = useDispatch();



  const handleChange = (event , name) => {
    console.log(event.target.value);
    console.log(name);
    switch (name) {
      case 'specialization':
        dispatch(SET_FILTER_SPEC(event.target.value))
        break;
      case 'experience':
        dispatch(SET_FILTER_EXP(event.target.value))
        break;
      default:
        break;
    }
  }


  function specliazationList() {
    return optionValue.map((data) => {
     return <option value={data}>{data} 
             </option>;
    });
  }

  return (
    <div>
      <Select placeholder={placeHolder} onChange={(e) => handleChange(e, SelectName)}>
        { specliazationList() }
      </Select>
    </div>
  );
}

export default FilterSelect;