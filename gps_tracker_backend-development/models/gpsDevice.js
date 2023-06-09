const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gpsDevice', {
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
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ready: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    imei: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'gps_device',
    schema: 'tracking',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedat',
    createdAt: 'createdat',
    updatedAt: 'updatedat',
    indexes: [
      {
        name: "gps_device_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
