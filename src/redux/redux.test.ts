import dataReducer, {
    setTotalCount,
    setLoading,
    setError,
    setStartIndex,
    IDataState,
    PAGINATION_LIMIT, accumulateBooks, increaseRetryCount
} from './dataSlice';
import filterSlice from "./filterSlice";
import {renderHook} from "@testing-library/react";
import {useFilteredBooks} from "../utils/useFilteredBooks";

describe('dataSlice', () => {
    let initialState: IDataState;

    beforeEach(() => {
        initialState = {
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
    });

    it('should handle setTotalCount correctly', () => {
        const action = setTotalCount(100);
        const state = dataReducer(initialState, action);
        expect(state.data.totalItems).toBe(100);
    });

    it('should handle setLoading correctly', () => {
        const action = setLoading(true);
        const state = dataReducer(initialState, action);
        expect(state.isLoading).toBe(true);
    });

    it('should handle setError correctly', () => {
        const error = { message: 'An error occurred', name: 'Error', stack: '', status: 500 };
        const action = setError(error);
        const state = dataReducer(initialState, action);
        expect(state.error).toEqual(error);
    });

    it('should handle setStartIndex correctly', () => {
        const action = setStartIndex(10);
        const state = dataReducer(initialState, action);
        expect(state.startIndex).toBe(10);
    });

    it('setDisplayCount', () => {
        const action = { type: 'data/setDisplayCount', payload: 60 };
        const state = dataReducer(initialState, action);
        expect(state.displayCount).toBe(60);
    });

    it('increaseRetryCount', () => {
        const action = { type: 'data/increaseRetryCount' };
        const state = dataReducer(initialState, action);
        expect(state.retryCount).toBe(1);
    });

    it('resetRetryCount', () => {
        initialState.retryCount = 5;
        const action = { type: 'data/resetRetryCount' };
        const state = dataReducer(initialState, action);
        expect(state.retryCount).toBe(0);
    });

    it('accumulateBooks', () => {
        const newBooks = [
            {
                id: '1',
                volumeInfo: {
                    title: 'Book 1',
                    imageLinks: { thumbnail: 'link1' },
                },
            },
            {
                id: '2',
                volumeInfo: {
                    title: 'Book 2',
                    imageLinks: { thumbnail: 'link2' },
                },
            },
        ];
        const action = { type: 'data/accumulateBooks', payload: newBooks };
        const state = dataReducer(initialState, action);
        expect(state.accumulatedBooks).toEqual(newBooks);
    });

    it('resetAccumulatedBooks', () => {
        initialState.accumulatedBooks = [
            {
                id: '1',
                volumeInfo: {
                    title: 'Book 1',
                    imageLinks: { thumbnail: 'link1' },
                },
            },
        ];
        const action = { type: 'data/resetAccumulatedBooks' };
        const state = dataReducer(initialState, action);
        expect(state.accumulatedBooks).toEqual([]);
    });

});

describe('filterSlice reducers', () => {
    let initialState: { query: string; subject: string; sortOrder: string; } | undefined;

    beforeEach(() => {
        initialState = {
            query: '',
            subject: '',
            sortOrder: 'relevance',
        };
    });

    it('should set search query correctly', () => {
        const newQuery = 'new search query';
        const action = { type: 'search/setSearchQuery', payload: newQuery };
        const state = filterSlice(initialState, action);
        expect(state.query).toBe(newQuery);
    });

    it('should set subject filter correctly', () => {
        const newSubject = 'new subject';
        const action = { type: 'search/setSubjectFilter', payload: newSubject };
        const state = filterSlice(initialState, action);
        expect(state.subject).toBe(newSubject);
    });

    it('should set sort order correctly', () => {
        const newSortOrder = 'new sort order';
        const action = { type: 'search/setSortOrder', payload: newSortOrder };
        const state = filterSlice(initialState, action);
        expect(state.sortOrder).toBe(newSortOrder);
    });
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
    useSelector: jest.fn(),
}));

jest.mock('./api', () => ({
    ...jest.requireActual('./api'),
    useSearchBooksQuery: jest.fn(),
}));

describe('useFilteredBooks hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should handle data correctly', () => {
        require('react-redux').useSelector.mockImplementation((selector: (arg0: { data: { startIndex: number; accumulatedBooks: never[]; displayCount: number; retryCount: number; data: { totalItems: number; }; }; }) => any) => selector({
            data: {
                startIndex: 0,
                accumulatedBooks: [],
                displayCount: 0,
                retryCount: 0,
                data: { totalItems: 10 },
            },
        }));

        require('./api').useSearchBooksQuery.mockReturnValue({
            data: { items: [], totalItems: 10 },
            error: null,
            isLoading: false,
            refetch: jest.fn(),
        });
        const { result } = renderHook(() => useFilteredBooks({ query: 'test', subject: '', sortOrder: 'relevance' }));

        expect(result.current.books).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe(null);
        expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
    });

});