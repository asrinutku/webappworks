const {Router} = require('express');
const workController = require('../controllers/workController');
const {authcontrol,kullaniciKontrol} = require('../middleware/authMiddlware');

const router = Router();

router.get('/work-add',authcontrol,workController.work_add_get);
router.post('/work-add',kullaniciKontrol,workController.work_add_post);

module.exports = router;
