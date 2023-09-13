import Card from "../Card/Card"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { getCountries, orderCards, filterByContinent } from "../../redux/actions"
import style from './Cards.module.css'

const Cards = ({countries}) => {
    const dispatch = useDispatch();

    const countriesRequest = () => dispatch(getCountries())

    const [continents,setContinents] = useState([])
    countries.forEach(country => {
        if(!continents.includes(country.continent)){
            setContinents([...continents,country.continent])
        }
    })

    //Paginado
    const [page,setPage] = useState(1)
    const cardsPerPage = 10;
    const lastItemIndex = page * cardsPerPage;
    const firstItemIndex = lastItemIndex - cardsPerPage;
    const currentCards = countries.slice(firstItemIndex, lastItemIndex);
    
    const nextPage = () => {
        if (page < Math.ceil(countries.length / cardsPerPage)) {
            setPage(page + 1);
        }
    };
        
    const previousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleOrder = (event) => {
        dispatch(orderCards(event.target.value))
        setPage(1)
    }

    const handleFilter = (event) => {
        dispatch(filterByContinent(event.target.value))
        setPage(1)
    }

    return(
        <div>
            <div>
                <select onChange={handleOrder}>
                    <option value="ASC" id='asc'>From A to Z</option>
                    <option value="DES" id='asc'>From Z to A</option>
                </select>

                <select onChange={handleOrder}>
                    <option value="POPASC" id='popasc'>Least populated first</option>
                    <option value="POPDES" id='popdes'>Most populated first</option>
                </select>

                <select name='filterByContinent' onChange={handleFilter}>
                    {continents.map(continent=><option value={continent} id={continent}>{continent}</option>)}
                </select>

                <button onClick={()=> countriesRequest()}>Show all</button>
            </div>

            <div className={style.cardsContainer}>
                {currentCards.map(country=>{
                    return <Card
                        key = {country.id}
                        id = {country.id}
                        image = {country.image}
                        name = {country.name}
                        continent = {country.continent}
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

export default Cards;