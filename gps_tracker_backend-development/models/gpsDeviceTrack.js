const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const GpsDeviceTrack = sequelize.define('gpsDeviceTrack', {
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
        model: 'ibeaconDevice',
        key: 'id'
      },
      field: 'id_ibeacon_device'
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lon: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    speed: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'gps_device_track',
    schema: 'tracking',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedat',
    createdAt: 'createdat',
    updatedAt: 'updatedat',
    indexes: [
      {
        name: "gps_device_track_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ],
    scopes: {
      betweenDates: (startDate, endDate) => {
        return {
          where: {
            timestamp: {
              [Sequelize.Op.between]: [startDate, endDate]
            }
          }
        };
      }
    }
  });

  GpsDeviceTrack.associate = function(models) {
    GpsDeviceTrack.belongsTo(models.ibeaconDevice, {
      foreignKey: 'id_ibeacon_device',
      as: 'ibeaconDevice'
    });
  };

  return GpsDeviceTrack;
};
