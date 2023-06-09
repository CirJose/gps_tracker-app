const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ibeaconDeviceTrack', {
    id: {
      autoIncrement: true,
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
    id_ibeacon_gateway: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'ibeacon_gateway',
        key: 'id'
      },
      field: 'id_ibeacon_gateway'
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'timestamp'
    },
    ibeaconmac: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'ibeaconmac'
    },
    gatewaymac: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'gatewaymac'
    },
    latgateway: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'latgateway'
    },
    longateway: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'longateway'
    },
    rssi: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'rssi'
    },
    rssi_filtered: { // nuevo campo para el RSSI filtrado
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'rssi_filtered'
    },
    distance: { // nuevo campo para la distancia
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'distance'
    },
    ibeacontxpower: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'ibeacontxpower'
    },
    latibeacon: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'latibeacon'
    },
    lonibeacon: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'lonibeacon'
    }
  }, {
    sequelize,
    tableName: 'ibeacon_device_track',
    schema: 'tracking',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedat',
    createdAt: 'createdat',
    updatedAt: 'updatedat',
    indexes: [
      {
        name: "ibeacon_device_track_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
