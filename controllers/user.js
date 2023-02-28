// Importar o model correspondente ao controller

const { User } = require('../models')

const controller = {}

/* 
Métodos CRUD do controller
create: cria um novo registro
retrieve: lista(recupera) todos os registros
retriaveOne: lista (recupera) apenas um registro
update: atualiza um registro
delete: exclui um registro
*/

controller.create = async (req, res) => {
    try{
        await User.create(req.body)
        //HTTP 201: Created
        res.status(201).end()
    }
    catch(error){
        console.error(error)
    }
}

controller.retrieve = async (req, res) => {
    try{
        const data = await User.findAll()
        //HTTP 200: OK (implicito)
        res.send(data)
    }
    catch(error){
        console.log(error)
    }
}

controller.retrieveOne = async (req, res) => {
    try{
        const data = await User.findByPk(req.params.id)
        //HTTP 200: OK (implicito)
        if(data) res.send(data)
        
        else res.status(404).end()
    }
    catch(error){
        console.log(error)
    }
}
module.exports = controller