import {batch} from "react-redux";
import {
    PAGINATION_LIMIT,
    resetAccumulatedBooks,
    resetRetryCount,
    setDisplayCount,
    setStartIndex,
    setTotalCount
} from "../redux/dataSlice";
import {Dispatch} from "@reduxjs/toolkit";

export function resetStateValues(dispatch: Dispatch) {
    batch(() => {
        dispatch(setStartIndex(0));
        dispatch(resetAccumulatedBooks());
        dispatch(setTotalCount(0));
        dispatch(setDisplayCount(PAGINATION_LIMIT))
        dispatch(resetRetryCount());
    });
}
