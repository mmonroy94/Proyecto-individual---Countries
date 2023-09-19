import ActCard from '../ActCard/ActCard'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteActivity, orderActivities, getActivities } from '../../../redux/actions'
import style from './ActCards.module.css'

const ActCards = () => {
    const dispatch = useDispatch()
    const [order,setOrder] = useState('')

    useEffect(()=>{
        dispatch(getActivities())
    },[])

        //ordenamiento
        const handleOrder = (event) => {
            console.log(event.target.value);
            dispatch(orderActivities(event.target.value)) && dispatch(getActivities())
            setPage(1)  
        }    

             
    const activities = useSelector(state=>state.activities)

    //paginado
    const [page,setPage] = useState(1)
    const cardsPerPage = 3;
    const lastItemIndex = page * cardsPerPage; 
    const firstItemIndex = lastItemIndex - cardsPerPage;
    const currentCards = activities?.slice(firstItemIndex, lastItemIndex)

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



    const onClose = (id) => {
        dispatch(deleteActivity(id))
     };



    return(
        <div>
            <h3>Activities</h3>
            <div className={style.filtersContainer}>
                <p>Sort by:</p>
                <select onChange={handleOrder}>
                    <option value="ASC" id='asc'>From A to Z</option>
                    <option value="DES" id='des'>From Z to A</option>
                </select>
            </div>


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
            
            <div className={style.pageNavigatorContainer}>
                <button onClick={previousPage}>🡨</button>
                <p>Página actual: {page}</p>
                <button onClick={nextPage}>🡪</button>
            </div>
        </div>
    )
}

export default ActCards;