import ActCard from '../ActCard/ActCard'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteActivity } from '../../../redux/actions'
import style from './ActCards.module.css'

const ActCards = ({activities}) => {
    //paginado
    const [page,setPage] = useState(1)
    const cardsPerPage = 5;
    const lastItemIndex = page * cardsPerPage; 
    const firstItemIndex = lastItemIndex - cardsPerPage;
    const currentCards = activities.slice(firstItemIndex, lastItemIndex)

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

    const dispatch = useDispatch()

    const onClose = (id) => {
        dispatch(deleteActivity(id))
     };

    return(
        <div>
            <div className={style.actCardsContainer}>
                {currentCards?.map(activity=>{
                    return <ActCard
                        key = {activity.id}
                        id = {activity.id}
                        name = {activity.activityName}
                        difficulty = {activity.difficulty}
                        duration = {activity.duration}
                        seasons = {activity.seasons?.map(season => season).join(', ')}                       
                        countries = {activity.Countries?.map(country => country.name).join(', ')}
                        onClose = {onClose}
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