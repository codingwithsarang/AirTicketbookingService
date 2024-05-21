const {StatusCodes} = require('http-status-codes')

class ServiceError extends Error{
    constructor( message='Something went wrong', statusCode=StatusCodes.INTERNAL_SERVER_ERROR, explanation='Service layer error'){
        super()
        this.name= 'ServiceError',
        this.message= message,
        this.statusCode = statusCode,
        this.explanation = explanation
    }
}
module.exports = ServiceError