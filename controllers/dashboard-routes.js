const router = require('express').Router();
const sequelize = require('../config/connection');
const { List, Item, User } = require('../models');


router.get('/', (req, res) => {
    List.findAll({
        where: {
            user_id: req.session.user_id
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
            const lists = dbListData.map(list => list.get({ plain: true }));
            console.log(lists);
            res.render('dashboard', {
                // User
                lists : lists,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('list/:id', (req, res) => {
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
        if (dbListData) {
            const list = dbListData.get({ plain: true });

            res.render('my-list', {
                list,
                loggedIn: true
            });
        } else {
            res.status(404).end();
        }
    })       
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;