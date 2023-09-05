import './BookCard.css'
import mockbook from '../../assets/mockbook.jpg'

export default function BookCard() {
    return (
        <div className="card">
            <div className="cardCategory">
                Biography
            </div>
            <div className="cardHead">
                <img alt="mockBook" className="bookImg"  src={mockbook}/>
            </div>
            <div className="cardBody">
                <div className="infoWrap">
                    <span className="bookTitle"> Node JS. Разработка серверных веб приложений на Javascript</span>
                    <span className="authorName">Давид Харрис Бой</span>
                </div>
            </div>
        </div>
    );
}