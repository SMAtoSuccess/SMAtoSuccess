const router = require('express').Router();
const { User, List } = require('../../models');


router.get('/', (req, res) => {
    res.render('home');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

router.get('/my-list', (req, res) => {
    res.render('my-list');
});

module.exports = router;