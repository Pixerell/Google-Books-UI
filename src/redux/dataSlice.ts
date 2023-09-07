import {createSlice, PayloadAction, SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

export const PAGINATION_LIMIT = 30

export interface IBookResponse {
    id: string;
    volumeInfo: {
        authors?: string[];
        title: string;
        imageLinks: {
            thumbnail: string;
        };
        categories?: string[];
    };
}

type BooksResponse = IBookResponse[];

export interface IDataState {
    data: {
        items: BooksResponse;
        totalItems: number;
    };
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError | null;
    startIndex: number;
    retryCount: number;
    paginationLimit: number;
    displayCount: number;
    accumulatedBooks: IBookResponse[];
}

const initialState: IDataState = {
    data: {
        items: [],
        totalItems: 0,
    },
    isLoading: false,
    error: null,
    retryCount: 0,
    startIndex: 0,
    displayCount: PAGINATION_LIMIT,
    paginationLimit: PAGINATION_LIMIT,
    accumulatedBooks: [],
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setTotalCount: (state, action: PayloadAction<number>) => {
            state.data.totalItems = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<FetchBaseQueryError | SerializedError | null>) => {
            state.error = action.payload;
        },
        setStartIndex: (state, action: PayloadAction<number>) => {
            state.startIndex = action.payload;
        },
        setDisplayCount: (state, action) => {
            state.displayCount = action.payload;
        },
        increaseRetryCount: (state) => {
            state.retryCount += 1;
        },
        resetRetryCount: (state) => {
            state.retryCount = 0;
        },
        accumulateBooks: (state, action: PayloadAction<IBookResponse[]>) => {
            const newBooks = action.payload;
            const combinedBooks = [...state.accumulatedBooks, ...newBooks];
            const uniqueTitles = new Set();
            const uniqueIds = new Set();
            state.accumulatedBooks = combinedBooks.filter((book) => {
                if (uniqueIds.has(book.id) || uniqueTitles.has(book.volumeInfo.title)) {
                    return false;
                }
                uniqueIds.add(book.id);
                uniqueTitles.add(book.volumeInfo.title);
                return true;
            });
        },
        resetAccumulatedBooks: (state) => {
            state.accumulatedBooks = [];
        },
    },
});

export const {
    setTotalCount,
    setLoading,
    setError,
    accumulateBooks,
    setStartIndex,
    resetAccumulatedBooks,
    setDisplayCount,
    increaseRetryCount,
    resetRetryCount,
} = {...dataSlice.actions};

export default dataSlice.reducer;
