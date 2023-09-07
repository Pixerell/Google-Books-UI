import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const MAX_RESULTS = 40

const API_HOST = 'www.googleapis.com/books/v1';
const API_KEY = 'AIzaSyDEGuxLYnidSDlM-NE8eZ64zpILnUPmBLw';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `https://${API_HOST}`,
    }),
    endpoints: (builder) => ({
        searchBooks: builder.query({
            query: ({search, subject = '', sortOrder = 'relevance', startIndex = 0}) => {
                return `volumes?q=volumes?q=${search}+subject:${subject}&orderBy=${sortOrder}&key=${API_KEY}&maxResults=${MAX_RESULTS}&startIndex=${startIndex}`;
            },
        }),
        getBook: builder.query({
            query: (volumeId: string) => {
                return `volumes/${volumeId}`;
            }
        }),
    }),
});

export const {useSearchBooksQuery} = api;
