const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const exphbs  = require('express-handlebars')
const port = 3000
const hostname = '127.0.0.1'
const fileUpload = require('express-fileupload')

const generateDate = require('./helpers/generateDate').generateDate
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')

mongoose.connect('mongodb://127.0.0.1/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})

const MongoStore = connectMongo(expressSession)

app.use(expressSession({
    secret:'merhaba',
    resave:false,
    saveUninitialized:true,
    store: MongoStore.create({ mongooseConnection : mongoose.connection })
}))

app.use(fileUpload())

app.use(express.static('public'))

// const hbs = exphbs.create({
//     helpers:{
//         generateDate : (date,format) => {
//             return moment(date).format(format)
//         }
//     }
// })

// app.engine('handlebars', hbs.engine)
app.engine('handlebars', exphbs({helpers:{generateDate:generateDate}}))

app.set('view engine', 'handlebars')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 

//dısplay lınk mw
app.use((req, res, next) => {
    const { UserId } = req.session

    if (userId) {
        res.locals = {
            displayLink: true
        }
    } else {
        res.locals = {
            displayLink: false
        }
    }
    next()
})

const main = require('./routes/main')
app.use('/',main)

const posts = require('./routes/posts')
const moment = require('moment')
app.use('/posts',posts)

const posts = require('./routes/posts')
app.use('/users',users)

const admin = require('./routes/admin/index')
app.use('/admin',admin)


app.listen(port, hostname, () => {
    console.log(` Server Çalışıyor, http://${hostname}:${port}/`);
})






