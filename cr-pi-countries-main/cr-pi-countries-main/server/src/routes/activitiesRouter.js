const activitiesRouter = require('express').Router();
const { createActivity, getActivities } = require('../controllers/activitiesControllers')

activitiesRouter.post('/', async(req,res) => {
    const { name, difficulty, duration, season, CountryId } = req.body;
        
    const newActivity = await createActivity( name, difficulty, duration, season, CountryId )
    if(!newActivity){
        res.status(404).send(`Ya existe una actividad con el nombre ${name}`)        
    }else if(newActivity){
        res.status(201).json(newActivity)             
    }
})

activitiesRouter.get('/', async(req,res) => {
    try{
        const activitiesAnswer = await getActivities()
        activitiesAnswer.length === 0 ? res.status(404).send('La actividad indicada no existe') : res.status(200).json(activitiesAnswer)
    }catch (error){
        res.status(404).send({error: error.message})
    }
})

module.exports = activitiesRouter;