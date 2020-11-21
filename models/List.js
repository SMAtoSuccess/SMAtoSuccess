const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class List extends Model {}

List.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    list_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    // item_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    //     // references: {
    //     //     model: 'list',
    //     //     key: 'id'
    //     // }
    // },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'list'
});

module.exports = List;