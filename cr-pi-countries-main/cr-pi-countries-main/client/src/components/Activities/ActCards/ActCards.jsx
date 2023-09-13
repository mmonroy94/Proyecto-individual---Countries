import ActCard from '../ActCard/ActCard'
import { useState } from "react"
import { useSelector } from "react-redux"
import style from './ActCards.module.css'

const ActCards = () => {
    const activities = useSelector(state=>state.activities)

    //paginado
    const [page,setPage] = useState(1)
    const cardsPerPage = 5;
    const lastItemIndex = page * cardsPerPage; 
    const firstItemIndex = lastItemIndex - cardsPerPage;
    const currentCards = activities.slice(firstItemIndex, lastItemIndex);

    const nextPage = () => {
        if (page < Math.ceil(activities.length / cardsPerPage)) {
            setPage(page + 1);
        }
    };
    
    const previousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    return(
        <div>
            <div className={style.actCardsContainer}>
                {currentCards.map(activity=>{
                    return <ActCard
                        key = {activity.id}
                        name = {activity.name}
                        difficulty = {activity.difficulty}
                        duration = {activity.duration}
                    />
                    })
                }
            </div>
            <div className={style.navigationContainer}>
                <button onClick={previousPage}>🡨</button>
                <p>Página actual: {page}</p>
                <button onClick={nextPage}>🡪</button>
            </div>
        </div>
    )
}

export default ActCards;