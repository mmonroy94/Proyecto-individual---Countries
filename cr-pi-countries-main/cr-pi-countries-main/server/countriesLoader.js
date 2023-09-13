const { Country } = require('./src/db');
const axios = require('axios');

const apiURL = "http://localhost:5000/countries"
const getCountries = async() => {
    try{
        const dbData = await Country.findAll();
        
        if (dbData.length !== 0) return dbData;

        const { data } = await axios.get(apiURL);
        const countriesData = data.map((country) => {
                    return {
                        id: country.cca3,
                        name: country.name.common,
                        image : country.flags.png,
                        capital: country.capital ? country.capital[0] : '-',
                        continent: country.continents[0] ? country.continents[0] : '-',
                        subregion: country.subregion ? country.subregion : '-',
                        area: country.area,
                        population: country.population,
                    }
                })
                const createCountries = await Country.bulkCreate(countriesData) 
                console.log('Paises creados exitosamente en la BD')
                return createCountries;
            }
    catch (error){
        return { error: error.message }
    }
}

module.exports ={
    getCountries
} 