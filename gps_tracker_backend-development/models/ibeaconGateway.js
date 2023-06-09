const { DataTypes, Sequelize } = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const ibeaconGateway = sequelize.define('ibeaconGateway', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    lat: {
      type: DataTypes.DECIMAL(13,10),
      allowNull: false
    },
    lon: {
      type: DataTypes.DECIMAL(13,10),
      allowNull: false
    },
    mac: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ibeacon_gateway',
    schema: 'tracking',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedat',
    createdAt: 'createdat',
    updatedAt: 'updatedat',
    indexes: [
      {
        name: "ibeacon_gateway_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  return ibeaconGateway;
};