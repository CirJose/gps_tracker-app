const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role', {
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
    }
  }, {
    sequelize,
    tableName: 'role',
    schema: 'tracking',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedat',
    createdAt: 'createdat',
    updatedAt: 'updatedat',
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
};
