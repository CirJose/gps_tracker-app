const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userOwnerRel', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_owner: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'owner',
        key: 'id'
      },
      field: 'id_owner'
    },
    idUsers: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'id_users'
    }
  }, {
    sequelize,
    tableName: 'user_owner_rel',
    schema: 'tracking',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedat',
    createdAt: 'createdat',
    updatedAt: 'updatedat',
    indexes: [
      {
        name: "user_owner_rel_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
