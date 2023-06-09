const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const IbeaconAlerts = sequelize.define('ibeaconAlerts', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    alert_type: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'alert_type'
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('now()'),
      field: 'created_at'
    }
  }, {
    sequelize,
    tableName: 'ibeacon_alerts',
    schema: 'tracking',
    paranoid: true, // Agrega esta propiedad
    created_at: 'createdat', // Agrega esta propiedad
    indexes: [
      {
        name: "ibeacon_alerts_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ],
  });


  // Aquí es donde estableces la asociación
  IbeaconAlerts.associate = function(models) {
    IbeaconAlerts.belongsTo(models.ibeaconDevice, {
      foreignKey: 'id_ibeacon_device',
      as: 'ibeaconDevice'
    });
  };

  return IbeaconAlerts;
};