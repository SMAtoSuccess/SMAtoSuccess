const router = require('express').Router();

const htmlRoutes = require('./html-routes');
const apiRoutes = require('./api-routes');


router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

module.exports = router;