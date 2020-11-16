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
                'list_name'
            ],
            include: [{
                model: Item,
                attributes: ['id', 'item_text', 'item_url', 'list_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
        }).then(dbListData => {
            const lists = dbListData.map(list => list.get({ plain: true }));
            res.render('dashboard', { lists, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;