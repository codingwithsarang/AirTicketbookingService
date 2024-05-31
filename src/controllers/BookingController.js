const {BookingService} = require('../services')
const {StatusCodes}= require('http-status-codes')

const bookingService = new BookingService()

const {REMAINDER_BINDING_KEY} = require('../config/serverConfig')
const {createChannel,publishMessage } = require('../utils/messageQueue')



class BookingController{
    constructor(channel){
        this.channel = channel
    }

    async sendMessageToQueue(req,res){
        const channel = await createChannel()
        const data = {message: 'Success'}
        publishMessage(channel, REMAINDER_BINDING_KEY, JSON.stringify(data))
        return res.status(200).json({
            message: 'successfully published the message'
        })
    }


    async create (req,res){
        try {
            const response = await bookingService.createBooking(req.body) 
            return res.status(StatusCodes.OK).json({
                data: response,
                message:"Successfully completed booking",
                success: true,
                err: {}
            })
        } catch (error) {
            console.log('booking controller',error)
            return res.status(error.statusCode).json({
                data: {},
                message: error.message,
                success: false ,
                error: error.explanation
            })
        }
    }
}



module.exports = BookingController