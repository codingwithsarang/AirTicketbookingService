const {StatusCodes} = require('http-status-codes')

class ValidationError extends Error{
    constructor(erro){
        super()
        let explanation = []
        error.errors.forEach(err => {
            explanation.push(err.message)
        });
        this.name= 'ValidationError',
        this.message= "Not able to validate the data",
        this.statusCode = StatusCodes.BAD_REQUEST,
        this.explanation = explanation
    }
} 

module.exports = ValidationError