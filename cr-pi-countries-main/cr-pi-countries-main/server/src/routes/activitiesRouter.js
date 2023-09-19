const activitiesRouter = require('express').Router();
const { createActivity, getActivities, deleteActivity } = require('../controllers/activitiesControllers')

activitiesRouter.post('/', async(req,res) => {
    const { activityName, difficulty, duration, seasons, countryId } = req.body;
    const newActivity = await createActivity( activityName, difficulty, duration, seasons, countryId )
    if(!newActivity){
        res.status(404).send(`Ya existe una actividad con el nombre ${activityName}`)        
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

activitiesRouter.delete('/:id', async(req,res) => {
    const { id } = req.params
    try {
        const activity = await deleteActivity(id)
        ! activity ? res.status(404).send('El id indicado no existe') : res.status(200).json('Actividad eliminada exitosamente')
    } catch (error) {
        res.status(404).send({error: error.message})
    }
})


module.exports = activitiesRouter;