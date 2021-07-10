const mongoose = require('mongoose')

const usersch = new mongoose.Schema({
    name : {type:String , required:True , unique :true},
    password : {type:String , required:True},

})

module.exports = mongoose.model('Post', usersch)