import { NavLink } from 'react-router-dom';
import style from './Landing.module.css'

const Landing = () => {
    return(
        <div className={style.landingContainer}>
            <div className={style.landingInfo}>
                <h1>¡Te damos la bienvenida!</h1>
                <NavLink to={'/home'}><button> Ingresar </button></NavLink>
            </div>
        </div>
    )
}

export default Landing;