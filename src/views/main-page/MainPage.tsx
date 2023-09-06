import './MainPage.css'
import BookCard from "../../components/book-card/BookCard";
import {Link} from "react-router-dom";
import InfoBlock from "../../components/info-block/InfoBlock";
import load from '../../assets/load.svg'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {useState} from "react";

export default function MainPage() {
    const [displayCount, setDisplayCount] = useState(30);
    const booksData = useSelector((state: RootState) => state.data.data);
    const books = booksData?.items;
    const isLoading = useSelector((state: RootState) => state.data.isLoading);
    const error = useSelector((state: RootState) => state.data.error) as FetchBaseQueryError | SerializedError | null;

    const booksToDisplay = books.slice(0, displayCount);

    const handleLoadMore = () => {
        if (books.length >= displayCount + 30) {
            setDisplayCount(displayCount + 30);
        } else {
            console.log("NEED MOAR BOOKS")
        }
    };

    return (
            <div className="bodySect">
                {isLoading || error ? (
                    <InfoBlock isLoading={isLoading} error={error || null}/>
                ) : (
                    <>
                        <span className="foundResults">Found Results: {booksData.totalItems}</span>
                        <div className="cardsWrap">
                            {booksToDisplay && booksToDisplay.map((book: any) => (
                                <Link key={book.id} to={`/book/${book.id}`}>
                                    <BookCard {...book}/>
                                </Link>
                            ))}
                        </div>
                        <button onClick={handleLoadMore} className="loadButton">
                            <div>LOAD 30 MORE</div>
                            <img alt="Loading button" className="buttonImg" src={load}/>
                        </button>
                    </>
                )}
                <div className="footSect"></div>
            </div>
    );
}