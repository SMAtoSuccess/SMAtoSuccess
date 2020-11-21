const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, List, Item } = require('../models');

router.get('/', (req, res) => {
    List.findAll({
        attributes: [
            'id',
            'list_name',
            'user_id',
            'created_at'
        ],
        include: [
            {
                model: Item,
                attributes: ['id', 'item_text', 'list_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbListData => {
            const lists = dbListData.map(list => list.get({ plain: true }));
            res.render('dashboard', {
                lists,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/list/:id', (req, res) => {
    List.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'list_name',
            'user_id',
            'created_at'
        ],
        include: [
            {
                model: Item,
                attributes: ['id', 'item_text', 'item_url', 'list_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(dbListData => {
        if (!dbListData) {
            res.status(404).json({ message: 'no list found with this id' });
            return;
        }
        
        const list = dbListData.get({ plain: true });

        res.render('my-list', {
            list,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;