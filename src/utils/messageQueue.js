const amqplib = require('amqplib')
const {MESSAGE_BROKER_URL, EXCHANGE_NAME}= require('../config/serverConfig')

const createChannel = async()=>{
    try {
        //this line connect the RabbitMQ server using the URL specified in MESSAGE_BROKER_URL.
        const connection = await amqplib.connect(MESSAGE_BROKER_URL)

        // A channel is created on the established connection. Channels are virtual connections inside a real TCP connection to RabbitMQ
        const channel = await connection.createChannel()

        /*An exchange named EXCHANGE_NAME is asserted. The type 'direct' indicates that the exchange will route messages with a routing key equal to the binding key of the queue. The third parameter, false, specifies that the exchange should not be durable (i.e., it won't survive a broker restart).*/
        await channel.assertExchange(EXCHANGE_NAME, 'direct',false)
        return channel
    } catch (error) {
        throw error
    }
}


const subscribeMessage = async(channel, service, binding_key)=>{
    try {
         // A queue named QUEUE_NAME is asserted. If the queue does not exist, it will be created
    const applicationQueue = await channel.assertQueue("QUEUE_NAME")

    channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key)

    channel.consume(applicationQueue.queue, msg =>{
        console.log('received data')
        console.log(msg.content.toString())
        channel.ack(msg)
    })
    } catch (error) {
        throw error
    }
   
}

const publishMessage = async(channel, binding_key, message)=>{
    try {
        await channel.assertQueue("QUEUE_NAME")
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message))
    } catch (error) {
        throw error
    }
}


module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
}


