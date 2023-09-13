import axios from 'axios';
import { GET_COUNTRIES, GET_COUNTRY_BY_ID, GET_COUNTRY_BY_NAME, ORDER_BY_NAME, GET_ACTIVITIES, ORDER_BY_POPULATION, FILTER_BY_CONTINENT, POST_ACTIVITY } from "./action-types";

export const getCountries = (name) => {
    return async function (dispatch) {
        try{
            if(name){
                const dbData = await axios.get(`http://localhost:3001/countries/?name=${name}`)
                const country = dbData.data
                dispatch({ type:GET_COUNTRY_BY_NAME, payload:country})
            }else if(!name){
                const dbData = await axios.get('http://localhost:3001/countries')
                const countries = dbData.data
                dispatch({ type:GET_COUNTRIES, payload:countries})
            }
        }catch(error){
            alert(error.response.data) 
        }

    }
}

export const getCountryById = (id) => {
    return async function (dispatch){ 
        try{
            const dbData = await axios.get(`http://localhost:3001/countries/${id}`)
            const country = dbData.data
            dispatch({ type:GET_COUNTRY_BY_ID, payload:country})
        }catch(error){
            alert(error.response.data) 
        }
    }
}

export const orderCards = (order) => {
    return async function (dispatch){
        try {
            if(order === 'ASC' || order === 'DES'){
                dispatch({ type:ORDER_BY_NAME, payload:order})
            }
            if(order === 'POPASC' || order === 'POPDES'){
                dispatch({ type:ORDER_BY_POPULATION, payload:order})
            }        
        } catch (error) {
            alert(error.response.data) 
        }
    }
}

export const filterByContinent = (continent) => {
    return async function (dispatch){
        try {
            dispatch({ type:FILTER_BY_CONTINENT, payload:continent})
        }catch (error) {
            alert(error.response.data) 
        }
    }
}

export const postActivity = (state) => {
    return async function (dispatch){ 
        try {
            await axios.post('http://localhost:3001/activities/',state)
            alert('Activity created!')
        } catch (error) {
            alert(error.response.data)
        }
    }
}


export const getActivities = () => {
    return async function (dispatch){
        try{
            const dbData = await axios.get('http://localhost:3001/activities')
            const activities = dbData.data
            dispatch({ type:GET_ACTIVITIES, payload:activities})

        }catch(error){
            alert(error.response.data)
        }
    }
}