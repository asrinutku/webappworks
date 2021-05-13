
const work = require('../models/work');

module.exports.work_add_get = (req,res)=>{

    res.render('work-add');
}

module.exports.work_add_post = async (req,res)=>{
    const {baslik,aciklama,baslama,bitis} = req.body;

    try {
        const work = await work.create({
            baslik,aciklama,baslamaZamani:new Date(baslama),bitisZamani:new Date(bitis),kullaniciId:res.locals.user._id
            
        });
        console.log(baslik,aciklama,baslama,bitis);
        res.status(200).json({work:work._id})
    } catch (error) {
        res.status(400).json({error});
    }

}

