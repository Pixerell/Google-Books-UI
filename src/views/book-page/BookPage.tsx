import './BookPage.css'
import InfoBlock from "../../components/info-block/InfoBlock";
import {useParams} from "react-router-dom";
import {api} from "../../redux/api";
import {stripHtmlTags} from "../../utils/clearHtmlTags";

interface IBookData {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description: string;
        categories?: string[];
        publishedDate: string;
        publisher?: string;
    }
}

export default function BookPage() {

    const {bookId} = useParams();
    const {data, error, isLoading} = api.endpoints.getBook.useQuery(
        bookId!
    );

    if (isLoading || error || !data) {
        return (
            <div className="bookPg">
                <InfoBlock isLoading={isLoading} error={error || null}/>
            </div>
        );
    }

    const bookData = data as IBookData;
    const bookDesc = stripHtmlTags(bookData.volumeInfo.description);

    return (
        <div className="bookPg">
            {isLoading || error || !data ? (
                <InfoBlock isLoading={isLoading} error={error || null}/>
            ) : (
                <div className="deskSeparator">
                    <div className="mainSect">
                        <div className="bookSection">
                            <div className="imgCont">
                                <img alt={bookData.id} className="bookImg"
                                     src={`https://books.google.com/books/publisher/content/images/frontcover/${bookData.id}?fife=w1000-h1400&source=gbs_api`}/>
                            </div>
                        </div>
                        <div className="descriptionSection">
                            <h2>{bookData.volumeInfo.title}</h2>
                            <h3 className="authorName">
                                {bookData.volumeInfo.authors ? bookData.volumeInfo.authors.join(", ") : "Author Unknown"}
                            </h3>
                            <div className="expandedBlock">
                                <h4 className="categories">{bookData.volumeInfo.categories ? bookData.volumeInfo.categories.join(", ") : "Unknown categories"}</h4>
                                <section className="bookDesc desktop">{bookDesc}</section>
                                <h4 className="authorName">Published Date: {bookData.volumeInfo.publishedDate}.
                                    By: {bookData.volumeInfo.publisher}...</h4>
                            </div>
                        </div>
                    </div>
                    <section className="bookDesc mobile">{bookDesc}</section>
                </div>
            )}
        </div>
    );
}