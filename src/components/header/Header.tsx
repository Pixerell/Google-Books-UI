import './Header.css'
import searchImg from '../../assets/search.svg'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useRef} from "react";
import {useFilteredBooks} from "../../redux/useFilteredBooks";
import {setSearchQuery, setSortOrder, setSubjectFilter} from "../../redux/filterSlice";


export default function Header() {

    const dispatch = useDispatch();
    const inputValueRef = useRef<HTMLInputElement | null>(null);
    const {query, subject, sortOrder} = useSelector((state: RootState) => state.search);
    useFilteredBooks({query, subject, sortOrder});

    const handleSearch = () => {
        if (inputValueRef.current?.value) {
            console.log(inputValueRef.current?.value, "INPUT REF")
            dispatch(setSearchQuery(inputValueRef.current?.value))
        }
    }
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const handleSortFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSubjectFilter(e.target.value));
    };

    const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSortOrder(e.target.value));
    };

    return (
        <div className="mainPg">
            <div className="headerSect">
                <h1>Google books UI</h1>
                <div>
                    <input ref={inputValueRef}
                           onKeyDown={handleKeyPress}
                           defaultValue={query}
                           className="searchField"
                           type="text"
                           placeholder="Search..."/>
                    <img onClick={handleSearch} alt="SeachButton" className="searchImg" src={searchImg}/>
                </div>
                <div className="filters">
                    <div className="selectorWrap">
                        <p>Categories</p>
                        <select className="selector" onChange={handleSortFilterChange}>
                            <option value="">All</option>
                            <option value="art">Art</option>
                            <option value="biography">Biography</option>
                            <option value="computers">Computers</option>
                            <option value="history">History</option>
                            <option value="medical">Medical</option>
                            <option value="poetry">Poetry</option>
                            <option value="music">Music</option>
                        </select>
                    </div>
                    <div className="selectorWrap">
                        <p>Sort by</p>
                        <select className="selector" onChange={handleSortOrderChange}>
                            <option value="relevance">Relevance</option>
                            <option value="newest">Newest</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

