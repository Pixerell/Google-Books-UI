import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const API_HOST = 'www.googleapis.com/books/v1';
const API_KEY = 'AIzaSyDEGuxLYnidSDlM-NE8eZ64zpILnUPmBLw';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `https://${API_HOST}`,
    }),
    endpoints: (builder) => ({
        searchBooks: builder.query({
            query: ({ search, startIndex = 0 }) => {
                const url = `volumes?q=volumes?q=&key=${API_KEY}&maxResults=40&startIndex=${startIndex}`;
                console.log(`Fetching URL: https://${API_HOST}/${url}`);
                return url;
                },
        }),

    }),
});

export const { useSearchBooksQuery } = api;
