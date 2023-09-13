const { Country } = require('../db');
const { Op } = require('sequelize');

 const getAllCountries = async (name) => {     
    if(name){
        const querySearch = await Country.findAll({
            where: {
              name: { [Op.iLike]: `%${name}%` },
            },
          });
        return querySearch;
    }else{
        return await Country.findAll();
    }
}

const getCountriesById = async (id) => {
  const countryAnswer = await Country.findByPk(id);
  const activitiesAnswer = await countryAnswer.getActivities();
  return [countryAnswer,...activitiesAnswer];
} 

 module.exports = { getAllCountries, getCountriesById }