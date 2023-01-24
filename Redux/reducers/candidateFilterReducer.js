import {createSlice} from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name : "filterCandidate",
    initialState: {
        data: {specialitaion: '' , experience: ''}
    },
    reducers: {
       SET_FILTER_SPEC(state , action){
        state.data = {...state.data , specialitaion: action.payload}
       },
       SET_FILTER_EXP(state , action){
        let {data}  = state;
        state.data = {...state.data , experience: action.payload}
       }
    }
})

export const {SET_FILTER_SPEC , SET_FILTER_EXP} = filterSlice.actions
export default filterSlice.reducer

 