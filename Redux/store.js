import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./reducers/faviorites";
import interviewCandidateReducer from './reducers/interviewCandidate';
import filterCandidateReducer from './reducers/candidateFilterReducer';

export default configureStore({
    reducer: {
        favorites: favoritesReducer,
        interviewCandidate: interviewCandidateReducer,
        filterCandidate: filterCandidateReducer
    }
})