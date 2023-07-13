const express = require("express");
const router = express.Router();


router.use('/product',require('./product'));
router.use('/auth',require('./user'));
router.use('/cart',require('./cart'));

module.exports = router;