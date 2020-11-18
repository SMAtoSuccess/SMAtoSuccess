const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Item extends Model {}

Item.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        item_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        item_url: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isURL: true
            }
        },
        list_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: 'list',
            //     key: 'id'
            // }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'item'
    }
);

module.exports = Item;