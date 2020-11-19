const router = require('express').Router();
const { User, List, Item } = require("../../models");

// GET /api/list
router.get('/', (req, res) => {
    res.render('home')

});

// Get all Items in a specific List
// router.get('/:id', (req, res) => {
//     List.findOne({
//             attributes: [
//                 'id',
//                 'list_name',
//                 'user_id'
//             ],
//             include: [{
//                 model: Item,
//                 attributes: ['id', 'item_text', 'item_url']
//             }]
//         })
//         .then(dbListData => {


//             res.json(dbListData);
            
//             })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// creates a list
router.post('/', (req, res) => {
    List.create({
            // change list_name to title
            list_name: req.body.list_name,
            user_id: req.session.user_id
        })
        .then(dbListData => {
            res.json(dbListData);
            console.log('here is the list data: ', dbListData.list_name);
            res.render('dashboard', {
                list_name : dbListData.list_name
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// updates list 
router.put('/:id', (req, res) => {
    List.update({
            list_name: req.body.list_name,
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(dbListData => {
            if (!dbListData) {
                res.status(404).json({ message: 'No List found with that id' });
                return;
            }
            res.json(dbListData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete a list
router.delete('/:id', (req, res) => {
    List.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbListData => {
            if (!dbListData) {
                res.status(404).json({ message: 'No list found with this id' });
                return;
            }
            res.json(dbListData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;