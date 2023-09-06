import './BookCard.css'
import {IBookResponse} from "../../redux/dataSlice";

type CategoryColor = {
    backgroundColor: string;
    boxShadowColor: string;
};

type CategoryColors = {
    [key: string]: CategoryColor;
};

export default function BookCard({ id, volumeInfo }: IBookResponse) {

    const category = volumeInfo?.categories && volumeInfo.categories.length > 0
        ? volumeInfo.categories[0].toLowerCase()
        : 'all';

    const categoryColors: CategoryColors = {
        all: { backgroundColor: '#d3d3d3', boxShadowColor: 'rgba(0, 0, 0, 0.3)' },
        art: { backgroundColor: '#f088ff', boxShadowColor: 'rgba(187, 32, 204, 0.3)' },
        biography: { backgroundColor: '#71ffef', boxShadowColor: 'rgba(70, 187, 160, 0.3)' },
        computers: { backgroundColor: '#ffee55', boxShadowColor: 'rgba(255, 204, 0, 0.5)' },
        computerscince: { backgroundColor: '#ffee55', boxShadowColor: 'rgba(255, 204, 0, 0.5)' },
        'computer science': {
            backgroundColor: '#ffee55',
            boxShadowColor: 'rgba(255, 204, 0, 0.5)'
        },
        history: { backgroundColor: '#ff275f', boxShadowColor: 'rgba(238, 10, 50, 0.3)' },
        medical: { backgroundColor: '#66ff66', boxShadowColor: 'rgba(6, 189, 9, 0.3)' },
        poetry: { backgroundColor: '#ffa734', boxShadowColor: 'rgba(255, 136, 0, 0.5)' },
        mathematics: { backgroundColor: '#848eff', boxShadowColor: 'rgba(12,54,211,0.5)' },
        music: { backgroundColor: '#ff48ce', boxShadowColor: 'rgba(247,0,255,0.5)' },
        science: { backgroundColor: '#7fffb6', boxShadowColor: 'rgba(90,255,188,0.5)' },
        religion: { backgroundColor: '#fd5757', boxShadowColor: 'rgba(166,62,62,0.5)' },
        'comics & graphic novels': {
            backgroundColor: '#a671ff',
            boxShadowColor: 'rgba(91,62,166,0.5)'
        }
    };

    const getCategoryStyles = (category: keyof CategoryColors) => {
        const defaultStyles: CategoryColor = {
            backgroundColor: '#71ffef',
            boxShadowColor: 'rgba(70, 187, 160, 0.3)',
        };

        const chosenCategory = categoryColors[category] || defaultStyles;

        return {
            backgroundColor: chosenCategory.backgroundColor,
            boxShadow: `4px 4px 1px rgba(0, 0, 0, 0.2), -4px -4px 1px ${chosenCategory.boxShadowColor}`
        };
    };

    const categoryStyles = getCategoryStyles(category);


    return (
        <div className="card" style={{boxShadow: categoryStyles.boxShadow}}>
            <div className="cardCategory" style={{backgroundColor: categoryStyles.backgroundColor}}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
            <div className="cardHead">
                <img alt={id} className="bookImg"  src={volumeInfo?.imageLinks?.thumbnail}/>
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