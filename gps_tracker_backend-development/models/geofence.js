const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('geofence', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
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
    geom: {
      type: DataTypes.GEOMETRY('POLYGON', 4326),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'geofence',
    schema: 'tracking',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedat',
    createdAt: 'createdat',
    updatedAt: 'updatedat',
    indexes: [
      {
        name: "geofence_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
