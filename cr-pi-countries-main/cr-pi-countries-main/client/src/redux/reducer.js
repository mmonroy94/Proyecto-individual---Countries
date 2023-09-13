import { GET_COUNTRIES, GET_COUNTRY_BY_ID, GET_COUNTRY_BY_NAME, ORDER_BY_NAME, ORDER_BY_POPULATION, GET_ACTIVITIES, FILTER_BY_CONTINENT, POST_ACTIVITY } from "./action-types";

const initialState = {
    countries: [],
    countriesCopy: [],
    countryDetail: [],
    activities: [],
    activitiesCopy: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                countriesCopy: action.payload
            }
        
            case GET_COUNTRY_BY_NAME:
                return{
                    ...state, 
                    countries: action.payload,
                    countriesCopy: action.payload
                }

        case GET_COUNTRY_BY_ID:
            return{
                ...state,
                countryDetail: action.payload
            }

        case ORDER_BY_NAME:
            return{
                ...state,
                countries : action.payload === 'ASC'
                ? [...state.countriesCopy].slice().sort((a,b)=>a.name.localeCompare(b.name))
                : [...state.countriesCopy].slice().sort((a,b)=>b.name.localeCompare(a.name))
            }

        case ORDER_BY_POPULATION:
            return{
                ...state,
                countries : action.payload === 'POPASC'
                ? [...state.countriesCopy].sort((a,b)=>(a.population - b.population))
                : [...state.countriesCopy].sort((a,b)=>(b.population - a.population))
            }
    
        case FILTER_BY_CONTINENT:
            return{
                ...state,
                countries: [...state.countriesCopy].filter(country => country.continent.includes(action.payload))
            }
        
        case GET_ACTIVITIES:
            return{
                ...state,
                activities: action.payload,
                activitiesCopy: action.payload
            }

        case POST_ACTIVITY:
            return{
                ...state,
                activities: action.payload,
                activitiesCopy: action.payload
            }

        default:
            return {...state}
    }
}

export default reducer;