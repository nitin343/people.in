import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./reducers/faviorites";
import interviewCandidateReducer from './reducers/interviewCandidate'

export default configureStore({
    reducer: {
        favorites: favoritesReducer,
        interviewCandidate: interviewCandidateReducer
    }
})