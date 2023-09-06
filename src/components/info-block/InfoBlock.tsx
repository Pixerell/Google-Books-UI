import './InfoBlock.css'
import wait from '../../assets/wait.svg'
import errorImg from '../../assets/error.svg'


export default function InfoBlock({isLoading, error}: {
    isLoading: boolean;
    error: boolean;
}) {
    const shouldShowError = !isLoading && error;

    return (
        <div className="loadingBlock">
            <img alt="Loading Indicator" className="loadingImg" src={shouldShowError ? errorImg : wait}/>
            <h1 className="loadingTitle">
                {shouldShowError ? 'Error...' : "Loading..."}
            </h1>
        </div>
    );
}