const mongoose = require('mongoose')

const postsch = new mongoose.Schema({
    title : {type:String , required:True},
    content : {type:String , required:True},
    date : {type:Date , default : Date.now},
    post_image : {type:String , required:True}


})

module.exports = mongoose.model('Post', postsch)