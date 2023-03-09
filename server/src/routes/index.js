const router = require('express').Router();

const users = require('./user');

router.use('/user', users);

module.exports = router;
