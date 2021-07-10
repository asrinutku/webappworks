const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/register',(req,res) =>{
    res.render('site/register')
})
 
router.post('/register',(req,res) =>{

    User.create(req.body,(error,user) =>{
        res.redirect('/')
    })
})

router.get('/login',(req,res) =>{
    res.render('site/login')
})

router.post('/login',(req,res) =>{
    const {name,password} = req.body

    User.findOne({name}, (error,user)=>{
        if(user){
            if(user.password === password){
               req.session.userId = user._id
               res.redirect('/') 
            }else{
            res.redirevt('/users/login')
            }
        }else{
            res.redirect('/users/register')
        }   
        
    })

})

router.get('/logout',(req,res) =>{
    req.session.destroy(()=>{
        res.render('site/login')
    })
    
})


module.exports = router