const router = require('express').Router();
const sequelize = require('../config/connection');
const { List, Item, User } = require('../models');


// router.get('/', (req, res) => {
//         const lists = dbListData.map(list => list.get({ plain: true }));
//         res.render('dashboard', {
//             User,
//             lists,
//             loggedIn: true
//         });
//         // req.session.save(() => {
//         //     // declare session variables
//         //     req.session.user_id = dbUserData.id;
//         //     req.session.username = dbUserData.username;
//         //     req.session.loggedIn = true;

//         //     res.json({ user: dbUserData, message: 'You are now logged in!' });
//         // });

//     })


// not rendering dashboard handlebars:
// error code: 'ER_BAD_FIELD_ERROR',
// errno: 1054,
// sqlState: '42S22',
// sqlMessage: "Unknown column 'items.user_id' in 'on clause'",
router.get('/', (req, res) => {
    List.findAll({
            // where: {
            //     user_id: req.session.user_id
            // },
            // attributes: [
            //     'id',
            //     'list_name'
            // ],
            // include: [{
            //     model: Item,
            //     attributes: ['id', 'item_text', 'item_url', 'list_id'],
            //     include: {
            //         model: User,
            //         attributes: ['username']
            //     }
            // }]
        }).then(dbListData => {

            console.log("hey")
            const lists = dbListData.map(list => list.get({ plain: true }));
            res.render('dashboard', {
                User,
                lists,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;