import './InfoBlock.css'
import wait from '../../assets/wait.svg'
import errorImg from '../../assets/error.svg'
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";


export default function InfoBlock({isLoading, error}: {
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError | null;
}) {
    const shouldShowError = !isLoading && error;
    return (
        <div className="loadingBlock">
            <img alt="Loading Indicator" className="loadingImg" src={shouldShowError ? errorImg : wait}/>
            <h1 className="loadingTitle">
                {shouldShowError ? (
                    error && 'status' in error ? (
                        `Error fetching...${(error as FetchBaseQueryError).status}`
                    ) : (
                        `Serialized error...`
                    )
                ) : (
                    "Loading boo..."
                )}
            </h1>
        </div>
    );
}