const { Country, Activity } = require('../db');

const { Op } = require('sequelize');

 const getAllCountries = async (name) => {     
    if(name){
        const querySearch = await Country.findAll({
            where: {
              name: { 
                [Op.iLike]: `%${name}%` 
              },
            }
          })

        return querySearch;
    }else{
        return await Country.findAll();
    }
}

const getCountriesById = async (id) => {
  const countryResponse = await Country.findByPk(id, {
    include: {
      model: Activity,
      as: 'Activities',
      attributes: ['id','activityName', 'difficulty', 'duration', 'seasons']
    }
  });
  return countryResponse;
}

 module.exports = { getAllCountries, getCountriesById }