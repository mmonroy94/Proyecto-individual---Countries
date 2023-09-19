import { GET_COUNTRIES, GET_COUNTRY_BY_NAME, ORDER_BY_NAME, ORDER_BY_POPULATION, GET_ACTIVITIES, FILTER_BY_CONTINENT, CLEAR_FILTERS_ORDERS, DELETE_ACTIVITY, ORDER_ACTIVITIES } from "./action-types";

const initialState = {
    countries: [],
    countriesCopy: [],
    activities: [],
    activitiesCopy: [],
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

        case ORDER_BY_NAME:
            const dataCopy = [...state.countries];
            const countriesSortedByName = dataCopy.sort((a, b) => {
              const nameA = a.name.toLowerCase();
              const nameB = b.name.toLowerCase();
              if (action.payload === "ASC") {
                return nameA.localeCompare(nameB);
              } else if (action.payload === "DES") {
                return nameB.localeCompare(nameA);
              }
            });
            return {
              ...state,
              countries: countriesSortedByName,
            };  

        case ORDER_BY_POPULATION:
            const dataCopy2 = [...state.countries];
            const countriesSortedByPop = dataCopy2.sort((a, b) => {
              const valueA = a.population;
              const valueB = b.population;
              if (action.payload === "POPASC") {
                return valueA - valueB;
              } else {
                return valueB - valueA;
              }
            });
            return {
              ...state,
              countries: countriesSortedByPop,
            };
    
        case FILTER_BY_CONTINENT:
            const dataCopy3 = [...state.countriesCopy];
            const filterByContinent = dataCopy3.filter(
              (con) => con.continent === action.payload
            );
            return { 
                ...state, 
                countries: filterByContinent 
            };

        case CLEAR_FILTERS_ORDERS:
            return{
                ...state,
                countries: [...state.countriesCopy],
                orderedCountries: [],
                filteredCountries: []
            }
        
        case GET_ACTIVITIES:
            return{
                ...state,
                activities: action.payload,
                activitiesCopy: action.payload
            }

        case ORDER_ACTIVITIES:
            const activitiesDataCopy = [...state.activities];
            const activitiesSortedByName = activitiesDataCopy.sort((a, b) => {
              const nameA = a.name.toLowerCase();
              const nameB = b.name.toLowerCase();
              if (action.payload === "ASC") {
                return nameA.localeCompare(nameB);
              } else if (action.payload === "DES") {
                return nameB.localeCompare(nameA);
              }
            });
            return {
              ...state,
              activities: activitiesSortedByName
            };

        case DELETE_ACTIVITY:
            const activitiesUpdate = [...state.activitiesCopy].filter(activity =>activity.id !== action.payload)
            return{
                ...state,
                activities: activitiesUpdate,
                activitiesCopy: activitiesUpdate
            }

        default:
            return {...state}
    }
}

export default reducer;