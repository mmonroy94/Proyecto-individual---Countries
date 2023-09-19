import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from './NavBar.module.css'

const NavBar = () => {
    return(
        <div className={style.navBarContainer}> 
            {/* <img src='https://indd.adobe.com/content/2/2fa4e791-22ea-4a5a-8c5a-b18bc57bcdd8/3384168157854/package/fr2d/publication-web-resources/image/Globe.png' /> */}
            <p>🌎 COUN<span>TRIES</span></p>
            
            <NavLink to='/home' className={style.navLink}>Home</NavLink>
            <NavLink to='/activities' className={style.navLink}>Activities</NavLink>
            <SearchBar className={style.searchBar} />
        </div>
    )
}

export default NavBar;