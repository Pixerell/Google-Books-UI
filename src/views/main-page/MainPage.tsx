import './MainPage.css'
import BookCard from "../../components/book-card/BookCard";
import {Link} from "react-router-dom";

export default function MainPage() {
    return (
            <div className="bodySect">
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
            </div>
    );
}