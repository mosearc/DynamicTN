require('dotenv').config()

const exspress = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')
const corsOptions = require('./config/cors')
const connectDB = require('./config/database')
const credentials = require('./middleware/credentials')
const errorHandlerMiddleware = require('./middleware/error_handler')

const app = exspress()
const PORT = 3500


connectDB()  

// allow credentials
app.use(credentials)

//cors
app.use(cors(corsOptions))

// application.x-www-form-urlencoded
app.use(exspress.urlencoded({extended: false}))

// application/json response
app.use(exspress.json())

// middleware for cookies
app.use(cookieParser())

//static files
app.use('/static', exspress.static(path.join(__dirname, 'public')))

// default error handler
app.use(errorHandlerMiddleware)

// routes
app.use('/api/auth', require('./routes/api/auth'))

app.all('*', (req, res) => {
    res.status(404)

    if(req.accepts('json')){
        res.json({'error': '404 Not found'})
    }else{
        res.type('text').send('404 Not Found')
    }
})



mongoose.connection.once('open', () => {
    console.log('DB connected')
    app.listen(PORT, () => { console.log(`listening on port ${PORT}`)})

})