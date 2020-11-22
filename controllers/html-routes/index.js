const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('home', { loggedIn: false });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

router.get('/api/list/', (req, res) => {
    res.render('my-list');
});

// router.get('/api/list/:id', (req, res) => {
//     res.render('dashboard');
// });

module.exports = router;