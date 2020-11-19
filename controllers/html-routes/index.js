const router = require('express').Router();
const { User, List, Item } = require('../../models');


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
    List.findOne({
        // where : {
            
        // },
        attributes: [
            'id',
            'list_name',
            'user_id'
        ],
        include: [{
            model: Item,
            attributes: ['id', 'item_text', 'item_url']
        }]
    })
    .then(dbListData => {


        res.json(dbListData);
        res.render('my-list');
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    
});

module.exports = router;