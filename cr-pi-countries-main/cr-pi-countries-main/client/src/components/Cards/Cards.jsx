import Card from "../Card/Card"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { orderCards, filterByContinent, clearFiltersAndOrders } from "../../redux/actions"
import style from './Cards.module.css'

const Cards = ({countries}) => {
    const dispatch = useDispatch();

    const [continents,setContinents] = useState([])
    countries.forEach(country => {
        if(!continents.includes(country.continent)){
            setContinents([...continents,country.continent])
        }
    })

    const [ order, setOrder ] = useState({
        alphOrder: false,
        populationOrder: false
    })

    console.log(order);

    const [ filter, setFilter ] = useState({
        continentFilter: false
    })

    console.log(filter);


    // PAGINADO
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

    // ORDENAMIENTO 
    const handleOrder = (event) => {
    // Verificar si la propiedad recibida en el evento está en true
        if (!order[event.target.name]) {
    // Si no está en true, setteamos todas las propiedades en false. Porque la otra prop puede estar en true
            setOrder((order) => {
            const updatedOrder = { ...order };
            for (const prop in updatedOrder) {
                updatedOrder[prop] = false;
            }
            // Setteamos en true la prop recibida del evento
            updatedOrder[event.target.name] = true;
            return updatedOrder;
            });
        }
        console.log(event.target.value);
        dispatch(orderCards(event.target.value))
        setPage(1)
    }

    //FILTRADO
    const handleFilter = (event) => {
        setFilter({[event.target.name]:true})
        console.log(event.target.value);
        dispatch(filterByContinent(event.target.value))
        setPage(1)
    }

    // LIMPIEZA DE FILTROS Y ORDENAMIENTOS
    const restartResults = () => {
        dispatch(clearFiltersAndOrders())
        setOrder({alphOrder:false,populationOrder:false})
        setFilter({continentFilter:false})
    }

    return(
        <div>
            <div>
                <select name='alphOrder' onChange={handleOrder}>
                    <option value="ASC" id='asc'>From A to Z</option>
                    <option value="DES" id='asc'>From Z to A</option>
                </select>

                <select name='populationOrder' onChange={handleOrder}>
                    <option value="POPASC" id='popasc'>Least populated first</option>
                    <option value="POPDES" id='popdes'>Most populated first</option>
                </select>

                <select name='continentFilter' onChange={handleFilter}>
                    {continents.map(continent=><option value={continent} id={continent}>{continent}</option>)}
                </select>

                <button onClick={()=> restartResults()}>Show all</button>
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




// CODIGO COMPONENTE FUNCIONANDO CORRECTAMENTE

// const Cards = ({countries}) => {
//     const dispatch = useDispatch();

//     const countriesRequest = () => dispatch(getCountries())

//     const [continents,setContinents] = useState([])
//     countries.forEach(country => {
//         if(!continents.includes(country.continent)){
//             setContinents([...continents,country.continent])
//         }
//     })

//     const [ order, setOrder ] = useState({
//         pageOrder: false,
//         populationOrder: false
//     })

//     const [ filter, setFilter ] = useState({
//         continentFilter: false
//     })


//     // PAGINADO
//     const [page,setPage] = useState(1)
//     const cardsPerPage = 10;
//     const lastItemIndex = page * cardsPerPage;
//     const firstItemIndex = lastItemIndex - cardsPerPage;
//     const currentCards = countries.slice(firstItemIndex, lastItemIndex);
    
//     const nextPage = () => {
//         if (page < Math.ceil(countries.length / cardsPerPage)) {
//             setPage(page + 1);
//         }
//     };
        
//     const previousPage = () => {
//         if (page > 1) {
//             setPage(page - 1);
//         }
//     }

//     // ORDENAMIENTO 
//     const handleOrder = (event) => {
//         dispatch(orderCards(event.target.value))
//         setPage(1)
//     }

//     //FILTRADO
//     const handleFilter = (event) => {
//         dispatch(filterByContinent(event.target.value))
//         setPage(1)
//     }

//     return(
//         <div>
//             <div>
//                 <select onChange={handleOrder}>
//                     <option value="ASC" id='asc'>From A to Z</option>
//                     <option value="DES" id='asc'>From Z to A</option>
//                 </select>

//                 <select onChange={handleOrder}>
//                     <option value="POPASC" id='popasc'>Least populated first</option>
//                     <option value="POPDES" id='popdes'>Most populated first</option>
//                 </select>

//                 <select name='filterByContinent' onChange={handleFilter}>
//                     {continents.map(continent=><option value={continent} id={continent}>{continent}</option>)}
//                 </select>

//                 <button onClick={()=> countriesRequest()}>Show all</button>
//             </div>

//             <div className={style.cardsContainer}>
//                 {currentCards.map(country=>{
//                     return <Card
//                         key = {country.id}
//                         id = {country.id}
//                         image = {country.image}
//                         name = {country.name}
//                         continent = {country.continent}
//                     />
//                     })
//                 }
//             </div>
//             <div className={style.navigationContainer}>
//                 <button onClick={previousPage}>🡨</button>
//                 <p>Página actual: {page}</p>
//                 <button onClick={nextPage}>🡪</button>
//             </div>
//         </div>
//     )
// }