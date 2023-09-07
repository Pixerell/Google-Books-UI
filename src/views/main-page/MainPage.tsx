import './MainPage.css'
import BookCard from "../../components/book-card/BookCard";
import {Link} from "react-router-dom";
import InfoBlock from "../../components/info-block/InfoBlock";
import load from '../../assets/load.svg'
import {batch, useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useFilteredBooks} from "../../redux/useFilteredBooks";
import {
    PAGINATION_LIMIT,
    resetRetryCount,
    setDisplayCount,
} from "../../redux/dataSlice";

export default function MainPage() {

    const dispatch = useDispatch()
    const { totalItems, displayCount } = useSelector((state: RootState) => ({
        totalItems: state.data.data.totalItems,
        displayCount: state.data.displayCount,
    }));
    const searchQuery = useSelector((state: RootState) => state.search);
    const {books, isLoading, error} = useFilteredBooks(searchQuery);
    const booksToDisplay = books.slice(0, displayCount);

    const handleLoadMore = () => {
        if (books.length >= displayCount + PAGINATION_LIMIT) {
            dispatch(setDisplayCount(displayCount + PAGINATION_LIMIT));
        } else {
            batch(() => {
                dispatch(setDisplayCount(displayCount + PAGINATION_LIMIT))
                dispatch(resetRetryCount())
            })
        }
    };

    return (
        <div className="bodySect">
            {isLoading || error || !booksToDisplay.length ? (
                <InfoBlock isLoading={isLoading} error={error || null}/>
            ) : (
                <>
                    <span className="foundResults">Found Results: {totalItems === 0 ? "..." : totalItems}</span>
                    <div className="cardsWrap">
                        {booksToDisplay && booksToDisplay.map((book: any) => (
                            <Link key={book.id} to={`/book/${book.id}`}>
                                <BookCard {...book}/>
                            </Link>
                        ))}
                    </div>
                    <button onClick={handleLoadMore} className="loadButton">
                        {displayCount > totalItems ? (
                            <div>
                                <div>END OF LIST</div>
                            </div>
                        ) : (
                            <div>
                                <div>LOAD 30 MORE</div>
                            </div>
                        )}
                        <img alt="Loading button" className="buttonImg" src={load}/>
                    </button>
                </>
            )}
            <div className="footSect"></div>
        </div>
    );
}