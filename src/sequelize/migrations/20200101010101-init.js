'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('example', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.BIGINT
      },
      key: {
        field: 'key',
        allowNull: false,
        type: Sequelize.STRING,
      },
      value: {
        field: 'value',
        allowNull: false,
        type: Sequelize.STRING
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('example');
  }
};
