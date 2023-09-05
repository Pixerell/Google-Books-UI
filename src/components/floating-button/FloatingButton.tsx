import './FloatingButton.css'
import home from '../../assets/home.svg'
import up from '../../assets/up.svg'
import {useLocation, useNavigate} from "react-router-dom";

export default function FloatingButton() {
    const location = useLocation();
    const navigate = useNavigate();
    const handleClick = () => {
        if (location.pathname === '/') {
            window.scrollTo({top: 0, behavior: 'smooth'});
        } else {
            navigate('/');
        }
    };
    return (
        <div className="floatingButton" onClick={handleClick}>
            <img alt="Floating Button" className="floatingImg" src={location.pathname === '/' ? up : home}/>
        </div>
    );
}