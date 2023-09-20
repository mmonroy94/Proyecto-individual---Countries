import style from './ActCard.module.css'

const ActCard = ({id,name,difficulty,duration,seasons, countries, onClose}) => {
    return(
        <div className={style.activityCardContainer}>
            <div className={style.activityInfo}>
                <p className={style.activityName}>{name}</p>
                <p>Difficulty: {difficulty}</p>
                <p>Duration: aprox. {duration} hours</p>
                <p>Seasons: {seasons}</p>
                <p>Countries: {countries}</p>
            </div>
            <div>
                <button onClick={()=>onClose(id)} className={style.activityDeleteButton}>X</button>
            </div>
        </div>
    )
}

export default ActCard;