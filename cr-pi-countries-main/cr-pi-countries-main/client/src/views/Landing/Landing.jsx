import { NavLink } from 'react-router-dom';
import style from './Landing.module.css'

const Landing = () => {
    return(
        <div className={style.landingContainer}>
            <div className={style.landingInfo}>
                <p>WELCOME</p>
                <h2>Henry project - Countries</h2>
                <NavLink to={'/home'}><button> Ingresar </button></NavLink>
            </div>
        </div>
    )
}

export default Landing;