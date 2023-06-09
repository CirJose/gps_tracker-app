const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ibeaconGpsOwnerRel', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_ibeacon_device: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'ibeacon_device',
        key: 'id'
      },
      field: 'id_ibeacon_device'
    },
    id_gps_device: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'gps_device',
        key: 'id'
      },
      field: 'id_gps_device'
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
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ibeacon_gps_owner_rel',
    schema: 'tracking',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedat',
    createdAt: 'createdat',
    updatedAt: 'updatedat',
    indexes: [
      {
        name: "ibeacon_gps_owner_rel_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
