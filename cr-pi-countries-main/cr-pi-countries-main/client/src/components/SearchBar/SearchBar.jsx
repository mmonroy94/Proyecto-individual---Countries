import { useState } from "react";
import { useDispatch } from "react-redux"
import { getCountries } from "../../redux/actions";
import style from './SearchBar.module.css'

const SearchBar = () => {
    // Estado local con el fin de indicar un value en el input, capturando cada cambio que se presente.
    const [name,setName] = useState('');
    
    const handleChange = (event) => {
        setName(event.target.value)
    }

    const dispatch = useDispatch();
    // Unicamente se despacha la action cuando la request se considere por el cliente completa y no con cada cambio
    const onSearch = (name) => {
        dispatch(getCountries(name))
    }

    return (
        <div className={style.searchBarContainer}>
            
            <input type="search" value={name} onChange={handleChange}/>
            <button onClick={()=> onSearch(name)}>Buscar</button>
        </div>
    )
}

export default SearchBar