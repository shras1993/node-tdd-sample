'use strict';

module.exports = (sequelize, DataTypes) => {
    var friends = sequelize.define ('friends', {
        name: DataTypes.STRING,
        email: DataTypes.STRING
        }, {
        classMethods: {
            associate: (models) => {
            }
        }
    });

    return friends;

}