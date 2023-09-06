import {configureStore } from '@reduxjs/toolkit';
import  {api} from "./api";
import dataReducer, {searchDataReducer} from './dataSlice';

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        data: dataReducer,
        search: searchDataReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = {
    data: ReturnType<typeof dataReducer>;
    search: ReturnType<typeof searchDataReducer>;
    // ...other reducers
};