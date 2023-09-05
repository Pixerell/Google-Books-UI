import './Header.css'
import searchImg from '../../assets/search.svg'

export default function Header() {
    return (
        <div className="mainPg">
            <div className="headerSect">
                <h1>Google books UI</h1>
                <div>
                    <input className="searchField"
                           type="text"
                           placeholder="Search..."/>
                    <img alt="SeachButton" className="searchImg" src={searchImg}/>
                </div>
                <div className="filters">
                    <div className="selectorWrap">
                        <p>Categories</p>
                        <select className="selector">
                            <option value="">Select an option...</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                    <div className="selectorWrap">
                        <p>Sort by</p>
                        <select className="selector">
                            <option value="">Select an option...</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

