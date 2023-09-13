 const countriesRouter = require('express').Router();
 const { getAllCountries, getCountriesById } = require('../controllers/countriesControllers')

 countriesRouter.get('/', async(req,res) => {
    const { name } = req.query;
    try{
        const countriesAnswer = name ? await getAllCountries(name) : await getAllCountries()
        countriesAnswer.length === 0 ? res.status(404).send('El país indicado no existe') : res.status(200).json(countriesAnswer)
    }catch (error){
        res.status(404).send({error: error.message})
    }
 });

 countriesRouter.get('/:id', async (req,res) => {
    const { id } = req.params;
    try{
        if(id.length === 3){
            const paramsAnswer = await getCountriesById(id)
            paramsAnswer ? res.status(200).json(paramsAnswer) : res.status(404).send('El ID indicado no existe');
        }else if(id.length < 3 || id.length > 3){
            res.status(404).send('El ID indicado no existe, debe ser de máximo 3 dígitos')
        }
    }catch (error){
        res.status(404).send({error: error.message})
    }     
 })

  module.exports = countriesRouter;