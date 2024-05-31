const { where } = require('sequelize')
const {Booking}= require('../models/index')
const { ValidationError, AppError } = require('../utils/errors')
const {StatusCodes} = require('http-status-codes')

class BookingRespository{
    async create(data){
        try {
            const booking = await Booking.create(data)
            return booking
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw new ValidationError(error)
            }
            throw new AppError(
            "RepositoryError",
            "Cannot create booking",
            "There was some issue in creating booking, please try again later",
            StatusCodes.INTERNAL_SERVER_ERROR 
        )
        }
    }

    async update(bookingId, data){
        try {
            await Booking.update(data, {
                where: {
                    id: bookingId
                }
            })
            return true 
        } catch (error) {
            throw new AppError(
                "RepositoryError",
                "Cannot update booking",
                "There was some issue in updating booking, please try again later",
                StatusCodes.INTERNAL_SERVER_ERROR 
            )
        }
    }
}

module.exports = BookingRespository