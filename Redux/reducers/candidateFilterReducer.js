import {createSlice} from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name : "filterCandidate",
    initialState: {
        data: {specialitaion: '' , experience: '', skills:'', languages:''}
    },
    reducers: {
       SET_FILTER_SPEC(state , action){
        state.data = {...state.data , specialitaion: action.payload}
       },
       SET_FILTER_EXP(state , action){
        let {data}  = state;
        state.data = {...state.data , experience: action.payload}
       },
       SET_FILTER_SKILL(state , action){
        let {data}  = state;
        state.data = {...state.data , skills: action.payload}
       },
       SET_FILTER_LANG(state , action){
        let {data}  = state;
        state.data = {...state.data , languages: action.payload}
       }
    }
})

export const {SET_FILTER_SPEC , SET_FILTER_EXP, SET_FILTER_SKILL, SET_FILTER_LANG} = filterSlice.actions
export default filterSlice.reducer

 