import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from './NavBar.module.css'

const NavBar = () => {
    return(
        <div className={style.navBarContainer}> 
            <img src="https://images.vexels.com/media/users/3/154655/isolated/lists/71dccbb077597dea55dfc5b7a7af52c4-icono-de-contacto-de-pin-de-ubicacion.png" alt="pinpointer" />
            <p>COUNTRIES</p>
            
            <NavLink to='/home' className={style.navLink}>Home</NavLink>
            <NavLink to='/activities' className={style.navLink}>Activities</NavLink>
            <SearchBar className={style.searchBar} />
        </div>
    )
}

export default NavBar;