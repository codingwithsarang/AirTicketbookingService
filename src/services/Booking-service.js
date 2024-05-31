const {BookingRespository} = require('../repositories/index') 
const {FLIGHT_SERVICE_PATH} = require('../config/serverConfig')
const axios = require('axios')
const {ServiceError} = require('../utils/errors')

class BookingService{
    constructor(){
        this.bookingRepository = new BookingRespository()
    }

    async createBooking(data){
        try {
            const flightId = data.flightId
            const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`
            const response = await axios.get(getFlightRequestURL)
            const flightData = response.data.data
            let priceOfFlight = flightData.price
            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError('Something went wrong in the flight booking process', 'Insufficient seats in the flights')
            }
            const totalCost = priceOfFlight * data.noOfSeats
            const bookingPayload = {...data, totalCost}
            const booking = await this.bookingRepository.create(bookingPayload)

            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`
            
            await axios.patch(updateFlightRequestURL,{totalSeats: flightData.totalSeats - data.noOfSeats })

            return booking
        } catch (error) {
            if(error.name == 'RepositoryError' || error.name == 'ValidationError'){
                return error
            }
            console.log(error)
           throw new ServiceError()
        }
    }

}

module.exports = BookingService