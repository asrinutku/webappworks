const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const workRoutes = require('./routes/workRoutes');
const cookieParser = require('cookie-parser');
const {authcontrol,kullaniciKontrol} = require('./middleware/authMiddlware');


const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine','ejs');

const dbURI = '';

mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then((result)=>{
    app.listen(3000,()=>{
        console.log("db basarılı server dinleniyor");
    });
}).catch((err)=>{
    console.log(err);
})

app.get('*',kullaniciKontrol);
app.get('/',authcontrol,(req,res)=>res.render('home'));
app.get('/works',authcontrol,(req,res)=>res.render('works'));

app.use(authRoutes);
app.use(workRoutes);


