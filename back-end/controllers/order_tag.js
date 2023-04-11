// Importar o model correspondente ao controller

const { OrderTag } = require('../models')

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
        await OrderTag.create(req.body)
        //HTTP 201: Created
        res.status(201).end()
    }
    catch(error){
        console.error(error)
    }
}

controller.retrieve = async (req, res) => {
    try{
        const data = await OrderTag.findAll()
        //HTTP 200: OK (implicito)
        res.send(data)
    }
    catch(error){
        console.log(error)
    }
}

controller.retrieveOne = async (req, res) => {
    try{
        const data = await OrderTag.findByPk(req.params.id)
        //HTTP 200: OK (implicito)
        if(data) res.send(data)
        
        else res.status(404).end()
    }
    catch(error){
        console.log(error)
    }
}

controller.update = async (req,res) => {
    try{
        const response = await OrderTag.update(
            req.body,
            {where : { id: req.params.id }}
        )

        //response retorna um vetor. O primeiro elemento do vetor indica quantos registros foram afetados pelo update
        if(response[0] > 0) {
            //HTTP 204: NO CONTENT
            res.status(204).end()
        }
        else{ //Não encontrou o registro para atualizar
            //HTTP 404: not found
            res.status(404).end
        }
    }
    catch(error) {
        console.error(error)
    }
}

controller.delete = async (req, res) => {
    try{
        const response = await OrderTag.destroy(
            { where: { id: req.params.id } }
        )

        if(response) { //ENCONTROU E EXCLUIU
            //HTTP 204: No content
            res.status(204).end()
        }
        else { //Não encontrou e não excluiu
            //HTTP 404: Not Found
            res.status(404).end()
        }
    }
    catch(error){
        console.error(error)
    }
}

module.exports = controller