const router = require('express').Router();
<<<<<<< HEAD
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});
=======

const htmlRoutes = require('./html-routes')

router.use('/', htmlRoutes);
>>>>>>> develop

module.exports = router;