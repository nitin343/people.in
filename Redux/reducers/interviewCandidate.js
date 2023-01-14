import {createSlice} from '@reduxjs/toolkit';

const interviewCandidateSlice = createSlice({
    name : "interviewCandidate",
    initialState: {
        data: []
    },
    reducers: {
       SET_INT(state , action){
        state.data = [...state.data , action.payload]
       },
       REMOVE_INT(state , action){
        let {data}  = state;
        state.data =  data.filter((data) => data.id !== action.payload.id)
       }
    }
})
console.log(interviewCandidateSlice);

export const {SET_INT , REMOVE_INT} = interviewCandidateSlice.actions
export default interviewCandidateSlice.reducer

 