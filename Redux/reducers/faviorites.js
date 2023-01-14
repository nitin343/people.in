import {createSlice} from '@reduxjs/toolkit';

const favSlice = createSlice({
    name : "favorites",
    initialState: {
        data: []
    },
    reducers: {
       SET_FAV(state , action){
        state.data = [...state.data , action.payload]
       },
       REMOVE_FAV(state , action){
        let {data}  = state;
        state.data =  data.filter((data) => data.id !== action.payload.id)
       }
    }
})

export const {SET_FAV , REMOVE_FAV} = favSlice.actions
export default favSlice.reducer

 