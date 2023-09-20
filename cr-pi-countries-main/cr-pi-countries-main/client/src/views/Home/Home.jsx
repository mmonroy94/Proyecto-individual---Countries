import Cards from "../../components/Cards/Cards"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCountries } from "../../redux/actions"

const Home = () => {
    const dispatch = useDispatch(); 
    const countries = useSelector(state=>state.countries)

    useEffect(()=>{
        if(countries.length === 0){
            dispatch(getCountries())
        }
    },[])
   
    return(
        <div>
            <Cards countries = {countries}/>
        </div>
    )
}

export default Home;