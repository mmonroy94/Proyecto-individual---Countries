const { Sequelize, DataTypes } = require('sequelize');
//const { v4: uuidv4 } = require('uuid')

module.exports = (sequelize) => {
    sequelize.define("Activity", {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey:true
        },
        activityName: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        },
        difficulty: {
          type: DataTypes.INTEGER,
          validate: { min: 1, max: 5},
          allowNull: false,
        },
        duration: {
          type: DataTypes.INTEGER,
          validate: { min: 1, max: 24},
          allowNull: true,
        },
        seasons: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          defaultValue: ['Summer', 'Autumn', 'Winter', 'Spring'],
          allowNull: false,
        }
      });
    };