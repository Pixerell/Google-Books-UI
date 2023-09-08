import './BookCard.css'
import {IBookResponse} from "../../redux/dataSlice";
import {getCategoryStyles} from "../../utils/colors";

export default function BookCard({id, volumeInfo}: IBookResponse) {

    const category = volumeInfo?.categories && volumeInfo.categories.length > 0
        ? volumeInfo.categories[0].toLowerCase()
        : 'all';
    const categoryStyles = getCategoryStyles(category);

    return (
        <div className="card" style={{boxShadow: categoryStyles.boxShadow}}>
            <div className="cardCategory" style={{backgroundColor: categoryStyles.backgroundColor}}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
            <div className="cardHead">
                <img alt={`Image ${id}`} className="bookImg"
                     src={`https://books.google.com/books/publisher/content/images/frontcover/${id}?fife=w600-h800&source=gbs_api`}/>
            </div>
            <div className="cardBody">
                <div className="infoWrap">
                    <span className="bookTitle">{volumeInfo?.title}</span>
                    <span className="authorName">{volumeInfo?.authors ? volumeInfo.authors.join(", ") : "Unknown Author"}</span>
                </div>
            </div>
        </div>
    );
}