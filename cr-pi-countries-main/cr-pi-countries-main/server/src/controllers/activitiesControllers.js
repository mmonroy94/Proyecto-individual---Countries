const { Activity, Country } = require('../db');

const getActivities = async () => 
    {const activities = await Activity.findAll({
            include: [{
            model: Country,
            as: 'Countries',
            attributes: ['id','name'],
            through: { attributes: [] }
        }]
    })
return activities;
};

const createActivity = async (activityName, difficulty, duration, seasons, countryId) => {
    const allActivities  = await getActivities();
    const validation = allActivities.find((activity) => activity.activityName === activityName);
    if(!validation){const newActivity = await Activity.create(
        {
            activityName,
            difficulty,
            duration,
            seasons
            // No se pasa la FK, aqui unicamente se pasa la info que pide el modelo.
        })
        // Usamos el método add de sequelize para settear en thunder el id del país

        // countryId.forEach(async (element) => {
        //     let country = await Country.findOne({ where: { id : element } });
        //     await newActivity.addCountry(country);
        //     console.log(country);
        // });
        // 
        await newActivity.addCountry(countryId);
        return newActivity;
    }
    return
} 

const deleteActivity = async (id) => {
    const activityData = await Activity.findByPk(id);
    return !activityData ? activityData : await activityData.destroy({where: {id: id}})
}

module.exports = { createActivity, getActivities, deleteActivity }