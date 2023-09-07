import {createSlice} from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'search',
    initialState: {
        query: '',
        subject: '',
        sortOrder: 'relevance',
    },
    reducers: {
        setSearchQuery: (state, action) => {
            return {
                ...state,
                query: action.payload,
            };
        },
        setSubjectFilter: (state, action) => {
            return {
                ...state,
                subject: action.payload,
            };
        },
        setSortOrder: (state, action) => {
            return {
                ...state,
                sortOrder: action.payload,
            };
        }
    }
});


export const {setSearchQuery, setSubjectFilter, setSortOrder} = filterSlice.actions;
export default filterSlice.reducer;
