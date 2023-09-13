import { NavLink } from 'react-router-dom';
import style from './Card.module.css'

// Componente que mostrará la info de cada usuario mapeado y dar un link para ir al detalle de la activity o country en cuestión.
const Card = ({id,image,name,continent}) => {

    return(
        <div className={style.cardContainer}>
            <NavLink to={`/detail/${id}`}>
            <img src={image} alt={id}/>
            </NavLink>
            <p>{name}</p>
            <p>Continent: {continent}</p>
            
        </div>
    )
}

export default Card;