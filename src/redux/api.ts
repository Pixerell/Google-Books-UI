import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const API_HOST = 'free-to-play-games-database.p.rapidapi.com';
const API_KEY = 'AIzaSyDEGuxLYnidSDlM-NE8eZ64zpILnUPmBLw';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `https://${API_HOST}/api`,
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', API_KEY);
            headers.set('X-RapidAPI-Host', API_HOST);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        fetchGames: builder.query({
            query: (filters) => {
                return {url: '/games',};
            },
        }),

        fetchSpecificGame: builder.query({
            query: ({gameId}) => {
                return {url: `/game`, params: {id: gameId}};
            }
        })

    }),
});

// export const {useFetchBooksQuery} = api;