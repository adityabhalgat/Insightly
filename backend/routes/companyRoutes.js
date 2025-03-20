const express = require('express');
const router = express.Router();
const companylogin = require('../controllers/auth/companylogin');
const companyregister = require('../controllers/auth/companyregister');

router.post('/register', companyregister);
router.post('/login', companylogin);

module.exports = router;
