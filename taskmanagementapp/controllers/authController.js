
const User = require('../models/user');
const jtw = require('jsonwebtoken');

const hataYakala=(err)=>{
    let errors = {email:'',parola:''};
    if(err.code===11000){
        errors.email="bu mail sistemde zaten kayıtlı";
        return errors;
    }
    
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach((properties)=>{
            errors[properties.path] = properties.message;

        });
    }

    if(err.message==='email-hatası'){
        errors.email = 'email adresini yanlıs girdiniz';
    }

    if(err.message==='parola-hatası'){
        errors.parola = 'parola yanlıs girdiniz';
    }
    return errors;
}

const maxAge = 3*24*60*60*1000;

const createToken = (id) =>{
    return jtw.sign({id},'auy',{
        expiresIn:maxAge
    });
}

module.exports.signup_get = (req,res)=>{
    res.render('signup');
}

module.exports.login_get = (req,res)=>{
    res.render('login');
}

module.exports.signup_post= async (req,res)=>{
    const {email,parola} = req.body;
    console.log(email,parola);

    try {
        const user = await User.create({email,parola});
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge});
        res.status(201).json(user);


    } catch (error) {
        res.status(400).send('hata olustu kullanıcı olusturulmadı');
        const errors = hataYakala(error);
        res.status(400).json({errors}); 
    }
}

module.exports.login_post= async (req,res)=>{
    const {email,parola} = req.body;
    try {
        const user = await User.login(email,parola);
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge});
        res.status(200).json({user:user._id});
    } catch (error) {
        const errors = hataYakala(error);
        res.status(400).json({errors});
    }
}

module.exports.logout_get=(req,res)=>{
    res.cookie('jwt','cıkıs yapıldı',{maxAge:1});
    res.redirect('/');
}
