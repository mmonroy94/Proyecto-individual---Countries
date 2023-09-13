const { Activity } = require('../db');

const getActivities = async () => await Activity.findAll();

const createActivity = async (name, difficulty, duration, season, countryId) => {
    const allActivities  = await getActivities();
    const validation = allActivities.find((activity) => activity.name === name);
    if(!validation){const newActivity = await Activity.create(
        {
            name,
            difficulty,
            duration,
            season
            // No se pasa la FK, aqui unicamente se pasa la info que pide el modelo.
        })
        // Usamos el método add de sequelize para settear en thunder el id del país
        await newActivity.addCountry(countryId);
        return newActivity;
    }
    return
} 

module.exports = { createActivity, getActivities }