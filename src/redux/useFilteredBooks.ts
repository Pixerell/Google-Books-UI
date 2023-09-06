import {useSearchBooksQuery} from "./api";
import {accumulateBooks, IBookResponse, setStartIndex} from "./dataSlice";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";

export function useFilteredBooks(searchTerm: string) {
    const dispatch = useDispatch();
    const startIndex = useSelector((state: RootState) => state.data.startIndex);
    const [retryCount, setRetryCount] = useState(0);
    const accumulatedBooks = useSelector((state: RootState) => state.data.accumulatedBooks);
    const { data, error, isLoading, refetch } = useSearchBooksQuery({ search: searchTerm, startIndex });
    const books = (data?.items || []).filter((book: IBookResponse) => book.volumeInfo.categories && book.volumeInfo.categories.length > 0);

    useEffect(() => {
        if (data && data.items) {
            if (accumulatedBooks.length < 30 || retryCount < 5) {
                console.log("Retry!")
                setRetryCount(retryCount + 1);
                dispatch(setStartIndex(startIndex + 40));
                dispatch(accumulateBooks(books));
                refetch();
            }
        }
    }, [data, refetch]);

    console.log(books, isLoading, "- books from hook")
    return {
        books: accumulatedBooks,
        isLoading,
        error,
    };
}
