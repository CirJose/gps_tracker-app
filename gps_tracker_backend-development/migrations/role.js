const Sequelize = require('sequelize');
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('role', {
      id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },  
      creationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'creation_date'
      },
      deleteDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'delete_date'
      }
    }, {
      sequelize,
      tableName: 'role',
      schema: 'tracking',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "role_pk",
          unique: true,
          fields: [
            { name: "id" },
          ]
        },
      ]
    });
  },
  down: async (queryInterface, DataTypes) => {
		await queryInterface.dropTable('role');
  }

};
