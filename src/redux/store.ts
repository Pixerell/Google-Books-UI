import {configureStore} from '@reduxjs/toolkit';
import {api} from "./api";
import dataReducer from './dataSlice';
import filterReducer from './filterSlice';

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        data: dataReducer,
        search: filterReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = {
    data: ReturnType<typeof dataReducer>;
    search: ReturnType<typeof filterReducer>;
};