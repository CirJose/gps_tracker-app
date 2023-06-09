const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CalibracionGateway', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_ibeacon_gateway: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'ibeacon_gateway',
        key: 'id'
      },
      field: 'id_ibeacon_gateway'
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lon: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    rssi: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ibeaconTxPower: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'calibracion_gateway',
    schema: 'tracking',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedat',
    createdAt: 'createdat',
    updatedAt: 'updatedat',
    indexes: [
      {
        name: "calibracion_gateway_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};