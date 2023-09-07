import {MAX_RESULTS, useSearchBooksQuery} from "./api";
import {
    accumulateBooks,
    IBookResponse, increaseRetryCount, PAGINATION_LIMIT,
    setDisplayCount,
    setError,
    setLoading,
    setStartIndex,
    setTotalCount
} from "./dataSlice";
import {useEffect, useMemo} from "react";
import {batch, useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {resetStateValues} from "../utils/resetStateValues";

export function useFilteredBooks(searchQuery: { query: string; subject: string; sortOrder: string; }) {
    const dispatch = useDispatch();
    const {query, subject, sortOrder} = searchQuery;
    const { startIndex, accumulatedBooks, displayCount, retryCount} = useSelector((state: RootState) => state.data);
    const totalItems = useSelector((state: RootState) => state.data.data.totalItems);

    const {data, error, isLoading, refetch} = useSearchBooksQuery({
        search: query,
        subject: subject,
        sortOrder: sortOrder,
        startIndex
    });

    const books = useMemo(() => {
        return (data?.items || []).filter((book: IBookResponse) => book.volumeInfo.categories && book.volumeInfo.categories.length > 0);
    }, [data]);

    useEffect(() => {
        if (data && data.items) {
            if (accumulatedBooks.length < displayCount && retryCount < 5) {
                batch(() => {
                    dispatch(increaseRetryCount());
                    dispatch(setStartIndex(startIndex + MAX_RESULTS));
                    dispatch(accumulateBooks(books));
                })
                refetch();
            } else {
                dispatch(setTotalCount(data?.totalItems));
            }
        } else {
            batch(() => {
                dispatch(setDisplayCount(totalItems + PAGINATION_LIMIT));
                dispatch(setTotalCount(accumulatedBooks.length))
            })
        }
        if (error) {
            dispatch(setError(error));
        }
        dispatch(setLoading(isLoading));
    }, [data, error, isLoading, refetch, displayCount]);

    useEffect(() => {
        resetStateValues(dispatch);
    }, [query, subject, sortOrder]);

    return {
        books: accumulatedBooks,
        isLoading,
        error,
    };
}
