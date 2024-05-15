const Joi = require('joi')

const taskData = Joi.object({
    taskName: Joi.string().required(),
    description: Joi.string().required(),
    owner: Joi.string().required(),
    status: Joi.string().required()
})

const validateTaskData = (req, res, next)=> {
    const {error} = taskData.validate(req.body, { abortEarly: false })
    if (error) {
        return res.status(400).json({type: error.details.map(detail => detail.type), message: error.details.map(detail => detail.message)})
    }

    next()
}

module.exports = {
    validateTaskData
}