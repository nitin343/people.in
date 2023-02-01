import React, { useEffect } from 'react';
import { Select } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { SET_FILTER_EXP, SET_FILTER_SPEC, SET_FILTER_SKILL, SET_FILTER_LANG } from '../../Redux/reducers/candidateFilterReducer';

function FilterSelect({ placeHolder, optionValue, SelectName }) {  
  const dispatch = useDispatch();



  const handleChange = (event , name) => {
    switch (name) {
      case 'specialization':
        dispatch(SET_FILTER_SPEC(event.target.value))
        break;
      case 'experience':
        dispatch(SET_FILTER_EXP(event.target.value))
        break;
      case 'skills':
        dispatch(SET_FILTER_SKILL(event.target.value))
        break;
      case 'languages':
        dispatch(SET_FILTER_LANG(event.target.value))
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