const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { PORT } = require('./config/serverConfig')
const apiRoutes = require('./routes/index')
const db  = require('./models/index')
const {DB_SYNC} = require('./config/serverConfig')

function setupAndStart(){

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    app.use('/api',apiRoutes)

   

    app.listen(PORT,()=>{
        console.log('server started on port no ',PORT)
        if(DB_SYNC){
            db.sequelize.sync({alter: true})
        }
    })
}



setupAndStart()