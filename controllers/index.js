const router = require('express').Router();

const htmlRoutes = require('./html-routes');
const apiRoutes = require('./api-routes');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
    res.status(404).end();
});


module.exports = router;