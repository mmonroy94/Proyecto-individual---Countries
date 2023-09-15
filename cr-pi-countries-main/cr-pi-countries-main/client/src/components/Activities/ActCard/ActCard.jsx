import style from './ActCard.module.css'

const ActCard = ({id,name,difficulty,duration,seasons, countries, onClose}) => {
    return(
        <div className={style.actCardContainer}>
            <p>Name: {name}</p>
            <p>Difficulty: {difficulty}</p>
            <p>Duration: {duration}</p>
            <p>Seasons: {seasons}</p>
            <p>Countries: {countries}</p>
            <button onClick={()=>onClose(id)}>X</button>
        </div>
    )
}

export default ActCard;