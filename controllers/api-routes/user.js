const router = require('express').Router();
const { User, List, Item } = require("../../models");

// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method
    User.findAll({
            attributes: { exclude: ['password'] }
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {

        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

    // pass in req.body instead to only update what's passed through
    User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// // Items in the List

// // Find all items
// router.get('/items', (req, res) => {
//     Item.findAll()
//         .then((dbItemData) => res.json(dbItemData))
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// // Create Items
// router.post('/items', (req, res) => {
//     Item.create({
//             item_text: req.body.item_text,
//             item_url: req.body.item_url,
//             list_id: req.body.list_id
//         })
//         .then(dbItemData => res.json(dbItemData))
//         .catch(err => {
//             console.log(err);
//             res.status(400).json(err);
//         });
// });


// router.delete('/items/:id', (req, res) => {
//     Item.destroy({
//             where: {
//                 id: req.params.id
//             }
//         })
//         .then(dbItemData => {
//             if (!dbItemData) {
//                 res.status(404).json({ message: 'No item found with this id' });
//                 return;
//             }
//             res.json(dbItemdata)
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });


module.exports = router;