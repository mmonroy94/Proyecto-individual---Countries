import style from './ActCard.module.css'

const ActCard = ({name,difficulty,duration,season,countries}) => {
    return(
        <div className={style.actCardContainer}>
            <p>Name: {name}</p>
            <p>Difficulty: {difficulty}</p>
            <p>Duration: {duration}</p>
            <p>Seasons: {season}</p>
            <p>Countries: {countries}</p>
        </div>
    )
}

export default ActCard;