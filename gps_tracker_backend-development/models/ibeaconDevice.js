const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const IbeaconDevice = sequelize.define('ibeaconDevice', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mac: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'ibeacon_device',
    schema: 'tracking',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedat',
    createdAt: 'createdat',
    updatedAt: 'updatedat',
    indexes: [
      {
        name: "ibeacon_device_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  return IbeaconDevice;
};
