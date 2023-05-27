import Joi from 'joi'

const OrderStatus = Joi.object({
    description: Joi.string()
       .min(2)
       .max(30)
       .required()
       .messages({'*': 'O ID da etiqueta é obrigatório (entre 2 e 30 caracteres)'}),
    sequence: Joi.number()
       .min(0)
       .max(100)
       .required()
       .messages({'*': 'O ID da encomenda é obrigatório (entre 2 e 30 caracteres)'}),
})
//permite campos não validados, como id, createdAt e updatedAt
.options({allowUnknown: true})

export default OrderStatus