
const express = require('express')
const router = express.Router()
const Post = require('../models/Post')


router.get('/',(req,res) =>{
    res.render('site/index')
})
 
router.get('/admin',(req,res) =>{
    res.render('admin/admin')
})

router.get('/blog',(req,res) =>{

    Post.find({}).then(posts => {
        res.render('site/blog', {posts:posts})
    })

})
module.exports = router