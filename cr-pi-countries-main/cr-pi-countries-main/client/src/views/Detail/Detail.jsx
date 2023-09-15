import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCountryById } from "../../redux/actions";

const Detail = () => {
    const { id } = useParams()
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCountryById(id))
    },[id])
    
    const countryData = useSelector(state=>state.countryDetail)
    
    return(
        <div>
            {countryData.map(data => {
                if(data.id === id){
                    return(
                        <div key={data.id}>
                            <img src={data.image} alt={data.id}/>
                            <p>ID: {data.id}</p>
                            <p>Nombre: {data.name}</p>
                            <p>Capital: {data.capital}</p>
                            <p>Subregión: {data.subregion}</p>
                            <p>Continente: {data.continent}</p>
                            <p>Área: {data.area} km²</p>
                            <p>Población: {data.population}</p>

                        </div>
                    )                      
                }
                if(data.id !== id){
                    return(
                        <div>
                            <p>Actividad: {data.name}</p>
                            <p>Dificultad: {data.difficulty}</p>
                            <p>Duración: {data.duration}</p>
                            <p>Temporada: {data.season}</p>  
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Detail;