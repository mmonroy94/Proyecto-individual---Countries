import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import ActCards from "../../components/Activities/ActCards/ActCards";
import style from './Detail.module.css'

const Detail = () => {
    const { id } = useParams()
    const [country, setCountry] = useState({});

    useEffect(() => {
        axios
          .get(`http://localhost:3001/countries/${id}`)
          .then(({ data }) => setCountry(data))
          .catch((error) => {
            alert("Error al obtener los detalles.");
          });
      }, [id]);
      console.log(country.Activities);
    return(
        <div className={style.detailContainer}>
            <div className={style.countryDetail} key={id}>
                <img src={country.image} alt={country.name}/>
                <h1>{country.name}</h1>
                <p>Id: {id}</p>
                <p>Capital: {country.capital}</p>
                { country.subregion && <p>Subregion: {country.subregion}</p> }
                <p>Continent: {country.continent}</p>
                { country.area && <p>Area: {country.area} km²</p>}
                <p>Population: {country.population}</p>
            </div>
            <div>
                {country.Activities && country.Activities.length>0 ? <ActCards activities={country.Activities} /> : <p>No hay actividades asociadas a este país</p>}
            </div>

        </div>
    )
}

export default Detail;