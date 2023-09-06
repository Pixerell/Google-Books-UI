import {createSlice, PayloadAction, SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

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

interface IDataState {
    data: {
        items: BooksResponse;
        totalItems: number;
    };
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError | null;
    startIndex: number;
    accumulatedBooks: IBookResponse[];

}

const initialState: IDataState = {
    data: {
        items: [],
        totalItems: 0,
    },
    isLoading: false,
    error: null,
    startIndex: 0,
    accumulatedBooks: [],
};



const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<any>) => {
                state.data.items = action.payload.items;
                state.data.totalItems = state.data.items.length;
                },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action:  PayloadAction<FetchBaseQueryError | SerializedError | null>) => {
            state.error = action.payload;
        },
        setStartIndex: (state, action: PayloadAction<number>) => {
            state.startIndex = action.payload;
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
        }
    },
});

const searchSlice = createSlice({
    name: 'search',
    initialState: '',
    reducers: {
        setSearchQuery: (state, action) => {
            return action.payload;
        },
    },
});

export const { setSearchQuery } = searchSlice.actions;
export const {
    setData,
    setLoading,
    setError,
    accumulateBooks,
    setStartIndex
} = { ...dataSlice.actions };

export const searchDataReducer = searchSlice.reducer;
export default dataSlice.reducer;
