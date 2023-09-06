import './Header.css'
import searchImg from '../../assets/search.svg'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useEffect, useRef} from "react";
import {setData, setError, setLoading, setSearchQuery} from "../../redux/dataSlice";
import {useFilteredBooks} from "../../redux/useFilteredBooks";


export default function Header() {

    const dispatch = useDispatch();

    const inputValueRef = useRef<HTMLInputElement | null>(null);
    const searchQuery = useSelector((state:RootState) => state.search);
    const { books, isLoading, error } = useFilteredBooks(searchQuery);
    useEffect(() => {
        if (books) {
            dispatch(setData({ items: books }));
        }
        if (error) {
            dispatch(setError(error));
        }
        dispatch(setLoading(isLoading));
    }, [books, error, isLoading, dispatch]);

    const handleSearch = () => {
        if (inputValueRef.current?.value) {
            dispatch(setSearchQuery(inputValueRef.current?.value))
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="mainPg">
            <div className="headerSect">
                <h1>Google books UI</h1>
                <div>
                    <input ref={inputValueRef}
                           onKeyDown={handleKeyPress}
                           defaultValue={searchQuery}
                        className="searchField"
                           type="text"
                           placeholder="Search..."/>
                    <img alt="SeachButton" className="searchImg" src={searchImg}/>
                </div>
                <div className="filters">
                    <div className="selectorWrap">
                        <p>Categories</p>
                        <select className="selector">
                            <option value="all">All</option>
                            <option value="art">Art</option>
                            <option value="biography">Biography</option>
                            <option value="computers">Computers</option>
                            <option value="history">History</option>
                            <option value="medical">Medical</option>
                            <option value="poetry">Poetry</option>
                        </select>
                    </div>
                    <div className="selectorWrap">
                        <p>Sort by</p>
                        <select className="selector">
                            <option value="relevance">Relevance</option>
                            <option value="newest">Newest</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

