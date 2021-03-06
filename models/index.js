const User = require('./User');
const List = require('./List');
const Item = require('./Items');

User.hasMany(List, {
    foreignKey: 'user_id'
});

List.belongsTo(User, {
    foreignKey: 'user_id'
});

Item.belongsTo(List, {
    foreignKey: 'list_id'
});

List.hasMany(Item, {
    foreignKey: 'list_id'
});

Item.belongsTo(User, {
    foreignKey: 'user_id'
});



module.exports = { User, List, Item };