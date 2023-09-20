import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { getCountries, postActivity, getActivities } from "../../redux/actions"
import { useSelector } from "react-redux"
import ActCards from '../../components/Activities/ActCards/ActCards'
import style from './Form.module.css'

const Form = () => {
    const seasons = ['Summer', 'Autumn', 'Winter', 'Spring']

    // state contenedor de la información ingresada al form
    const [activityState, setActivityState] = useState({
        activityName:'',
        difficulty: '',
        duration: 0,
        seasons:[],
        countryId: []
    })

    // state para manejo de errores
    const [error, setError] = useState({
        activityName:'Activity name required',
        difficulty: '',
        duration:'',
        seasons: '',
        countryId:''
    })
    console.log(error);

    // Validación errores - Al asociar prop estamos validando un único input y si no lo especificamos estaríamos validando todos los inputs al mismo tiempo
    const formValidation = (stateAux, prop)=>{
        if(prop === 'activityName') {
            if(stateAux.activityName === ''){
                setError({...error, activityName:'Activity name required'})
            } else{setError({...error, activityName:''})}
        }

        if(prop === 'difficulty') {
            if(stateAux.difficulty < 1 || stateAux.difficulty > 5){
                setError({...error, difficulty:'Difficulty selection is required'})
            }else if(isNaN(parseInt(stateAux.difficulty))){
                setError({...error, difficulty:'Difficulty must be a numer between 1 and 5'})
            } else{setError({...error, difficulty:''})}
        }

        if(prop === 'duration') {
            if( stateAux.duration === ''){
                setActivityState({...activityState, duration: null})
                setError({...error, duration:''})
            }else if(stateAux.duration < 1 || stateAux.duration > 24 || Number.isInteger(stateAux.duration) || isNaN(Number(stateAux.duration))){
                setError({...error, duration:'Duration must be a number between 1 and 24'})
            } else{setError({...error, duration:''})}
        }

        if(prop === 'seasons') {
            if(stateAux.seasons.length === 0){
                setError({...error, seasons:'At least one season is required'})
            } else if(stateAux.seasons !== 'Summer' && stateAux.seasons !== 'Autumn' && stateAux.seasons !== 'Winter' && stateAux.seasons !== 'Spring'){
                setError({...error, seasons:"The season's acceptable values are Summer, Autumn, Winter and Spring"})
            } else{setError({...error, seasons:''})}
        }

        if(prop === 'countryId') {
            if(stateAux.countryId.length === 0){
                setError({...error, countryId:'At least one country is required'})
            } else{setError({...error, countryId:''})}
        }
    }

    const handleChange = (event) =>{
        // Modificación del estado con la info recibida en el input
        if(event.target.name==="countryId" || event.target.name==="seasons"){
            if(event.target.value==='') return activityState
            if(event.target.name==="countryId" ? !activityState.countryId.includes(event.target.value) : !activityState.seasons.includes(event.target.value)){
                return setActivityState({
                        ...activityState,
                        [event.target.name]: [...activityState[event.target.name], event.target.value]
                      })
            }}else{
                setActivityState({
                    ...activityState,
                    [event.target.name]: event.target.value
                    })}

        // Primer parametro una copia del estado + la prop modificada para no esperar el re-renderizado y hacer la validación en tiempo real.
        // El segundo parametro corresponde a la prop del state que estamos validando
        formValidation({
            ...activityState,[event.target.name]: event.target.value
            }, event.target.name)
    }

    const handleDelete = (event) => {
        setActivityState({
        ...activityState,
        [event.target.name]: [...activityState[event.target.name].filter(element=> element!==event.target.id)]
        })

    }

    const disableByErrors = ()=>{
        let disabledAux = true;
        for(let err in error){
            if(error[err] === '') {
                disabledAux = false;
            }else{
                disabledAux = true;
                break
            }
        }
            return disabledAux;
    }

    const disableByEmptyProps = ()=>{
        let disabledAux = true;
            if(activityState.activityName === '' || activityState.difficulty.length < 1 || activityState.difficulty.length > 5 || activityState.seasons.length < 1 || activityState.countryId.length < 1) {
                disabledAux = true;
            }else{
                disabledAux = false;
            }
            return disabledAux;
        }

    // Guardar información en la db

    const activityPost = () => {
        dispatch(postActivity(activityState))
    }

    // Renderización de activities y ordenamiento

    const dispatch = useDispatch()
    const countriesData = useSelector(state=>state.countries)
    const activities = useSelector(state=>state.activities)

    useEffect(()=>{
            dispatch(getCountries())
            dispatch(getActivities())
    },[])


    return(
        <div className={style.formContainer}>
            <form onSubmit={activityPost} className={style.formInfo}>
                <h2>Create an activity</h2>

                <label>Activity name *</label>
                <input name='activityName' onChange={handleChange} type="text" />
                <label className={style.formErrorMessage}>{error.activityName}</label>

                <label>Difficulty *</label>
                <select name="difficulty" onChange={handleChange} className={style.activitySelectGroup}>
                    <option value={''}>-- Choose one option --</option>
                    <option value={1} key={1}>Easy</option>
                    <option value={2} key={2}>Medium-Easy</option>
                    <option value={3} key={3}>Medium</option>
                    <option value={4} key={4}>Medium-Hard</option>
                    <option value={5} key={5}>Hard</option>
                </select>
                <label className={style.formErrorMessage}>{error.difficulty}</label>

                <label>Approximate duration in hours - optional</label>
                <input name='duration' onChange={handleChange} type="text"/>
                <label className={style.formErrorMessage}>{error.duration}</label>

                <label>Seasons *</label>
                <select name='seasons' onChange={handleChange} className={style.activitySelectGroup}>
                    <option value={''}>-- Choose at least one option --</option>
                    {seasons.map(season=> <option value={season} id={season} key={season}> {season} </option>)}
                </select>
                <label className={style.formErrorMessage}>{error.seasons}</label>

                <div className={style.selectedGroup}>
                    {
                        activityState.seasons.map((element)=>
                            <div className={style.selectedSeason}>
                                <label
                             >{element}</label> <button name='seasons' id={element} key={element} onClick={handleDelete} className={style.deleteSelected}>X</button>
                            </div>)
                    }
                </div>

                <label>Countries *</label>
                <select name='countryId' onChange={handleChange} className={style.activitySelectGroup}>
                    <option value={''}>-- Choose at least one option --</option>
                    {countriesData?.map(country=><option value={country.id} key={country.id}>{country.id} - {country.name}</option>)}
                </select>
                <label className={style.formErrorMessage}>{error.countryId}</label>

                <div className={style.selectedGroup}>
                    {
                        activityState.countryId.map((element)=> {
                            const countryName = countriesData.find(
                                (country) => country.id === element
                            )
                            return (
                                <div className={style.selectedCountry}>
                                    <label>{element} - {countryName.name}</label> <button name='countryId' key={element} id={element} onClick={handleDelete} className={style.deleteSelected}>X</button>
                                </div>
                            )
                        })
                    }
                </div>

                <button disabled={disableByErrors() || disableByEmptyProps()}  className={style.submitButton} type="submit">Submit</button>
            </form>

            <div>


                <ActCards activities={activities}/>
            </div>
        </div>
    )
}
// disabled - true deshabilitado / false habilitado
export default Form;