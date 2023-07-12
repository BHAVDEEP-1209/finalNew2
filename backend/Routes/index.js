const express = require("express");
const router = express.Router();


router.use('/product',require('./product'));
router.use('/auth',require('./user'));

module.exports = router;