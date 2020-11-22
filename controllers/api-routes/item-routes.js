const router = require('express').Router();
const { Item, List } = require('../../models');

router.get('/', (req, res) => {
    Item.findAll()
        .then((dbItemData) => res.json(dbItemData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/:id', (req, res) => {
    console.log("hey");
    if (req.session) {
        console.log(req.body.list_id);
        Item.create({
            item_text: req.body.item_text,
            list_id: req.body.list_id,
            user_id: req.session.user_id
        })
            .then(dbItemData => res.json(dbItemData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.delete('/:id', (req, res) => {
    Item.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbItemData => {
            if (!dbItemData) {
                res.status(404).json({ message: 'No item found with this id' });
                return;
            }
            res.json(dbItemData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
