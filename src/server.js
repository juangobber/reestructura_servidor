import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars"
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";

import { logError, logInfo, logSuccess } from "./utils/console.utils.js";
import __dirname from "./utils.js";
import ENV from "./config/env.config.js";
import errorHandler from "./middleware/error.middleware.js";
import appRouter from "./routes/app.routes.js"
import viewsRoutes from "./routes/views.routes.js"
import initializePassport from "./config/passport.config.js";






const app = express()

//Plantillas de handlebars
const multiplyHelper = function(a, b){
    return a * b
}
app.engine('handlebars', handlebars.engine({
    helpers: {
        multiply : multiplyHelper
    }
}))
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

//Middleware de express
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))

//Session Middleware
app.use(session({
    store:MongoStore.create({
        mongoUrl:ENV.DB_URI
    }),
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true
}));
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use('/api', appRouter)
app.use('/', viewsRoutes)



//Error handler
app.use(errorHandler) //SIEMPRE SE DEFINE AL FINAL 

//Connect to the database and run the server
mongoose.connect(ENV.DB_URI)
    .then(()=>{
        const serverUri = `http://localhost:${ENV.PORT}`
        
        logInfo('Conected to DB successfuly!')
        const server = app.listen(ENV.PORT, () => {  
            logSuccess(`The server is running on ${serverUri}`)
        })

        server.on('error', (error) => {
            logError(`An error occurred while trying to start the server on ${serverUri}`)
            throw error
        })
    })
.catch((error) => {
    logError('An error occured tryin to connect to the DB at the specified URI')
    throw error
})



