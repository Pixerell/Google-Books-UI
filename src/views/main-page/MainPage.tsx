import './MainPage.css'
import BookCard from "../../components/book-card/BookCard";
import {Link} from "react-router-dom";
import InfoBlock from "../../components/info-block/InfoBlock";

export default function MainPage() {

    const isLoading = false;
    const error = false;

    return (
            <div className="bodySect">
                {isLoading || error ? (
                    <InfoBlock isLoading={isLoading} error={error}/>
                ) : (
                    <>
                        <span className="foundResults">Found Results: 444</span>
                        <div className="cardsWrap">
                            <Link to={`/book/${1}`}>
                                <BookCard/>
                            </Link>
                            <BookCard/>
                            <BookCard/>
                            <BookCard/>
                            <BookCard/>
                            <BookCard/>
                            <BookCard/>
                            <BookCard/>
                            <BookCard/>
                            <BookCard/>
                            <BookCard/>
                        </div>
                    </>
                )}
            </div>
    );
}