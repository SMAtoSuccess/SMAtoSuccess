const router = require('express').Router();
const { User, List, Item } = require("../../models");


router.get('/', (req, res) => {
    List.findAll({
        attributes: [
            'id',
            'list_name',
            'item_id',
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
        ]
    })
        .then(dbListData => res.json(dbListData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
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
        ]
    }).then(dbListData => {
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

// creates a list
router.post('/', (req, res) => {
    List.create({
        list_name: req.body.list_name,
        user_id: req.session.user_id
    })
        .then(dbListData => {
            res.json(dbListData)
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