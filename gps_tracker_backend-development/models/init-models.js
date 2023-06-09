var DataTypes = require("sequelize").DataTypes;
var _geofence = require("./geofence");
var _gpsDevice = require("./gpsDevice");
var _gpsDeviceTrack = require("./gpsDeviceTrack");
var _ibeaconDevice = require("./ibeaconDevice");
var _ibeaconDeviceTrack = require("./ibeaconDeviceTrack");
var _ibeaconGateway = require("./ibeaconGateway");
var _ibeaconGpsOwnerRel = require("./ibeaconGpsOwnerRel");
var _owner = require("./owner");
var _role = require("./role");
var _userOwnerRel = require("./userOwnerRel");
var _users = require("./users");
var _calibracionGateway = require("./calibracionGateway");

function initModels(sequelize) {
  var geofence = _geofence(sequelize, DataTypes);
  var gpsDevice = _gpsDevice(sequelize, DataTypes);
  var gpsDeviceTrack = _gpsDeviceTrack(sequelize, DataTypes);
  var ibeaconDevice = _ibeaconDevice(sequelize, DataTypes);
  var ibeaconDeviceTrack = _ibeaconDeviceTrack(sequelize, DataTypes);
  var ibeaconGateway = _ibeaconGateway(sequelize, DataTypes);
  var ibeaconGpsOwnerRel = _ibeaconGpsOwnerRel(sequelize, DataTypes);
  var owner = _owner(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var userOwnerRel = _userOwnerRel(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var calibracionGateway = _calibracionGateway(sequelize, DataTypes);

  gpsDeviceTrack.belongsTo(gpsDevice, { as: "id_ibeacon_deviceGpsDevice", foreignKey: "id_ibeacon_device" });
  gpsDevice.hasMany(gpsDeviceTrack, { as: "gpsDeviceTracks", foreignKey: "id_ibeacon_device"});
  ibeaconGpsOwnerRel.belongsTo(gpsDevice, { as: "id_gps_deviceGpsDevice", foreignKey: "id_gps_device" });
  gpsDevice.hasMany(ibeaconGpsOwnerRel, { as: "ibeaconGpsOwnerRels", foreignKey: "id_gps_device"});
  ibeaconDeviceTrack.belongsTo(ibeaconDevice, { as: "id_ibeacon_deviceIbeaconDevice", foreignKey: "id_ibeacon_device" });
  ibeaconDevice.hasMany(ibeaconDeviceTrack, { as: "ibeaconDeviceTracks", foreignKey: "id_ibeacon_device"});
  ibeaconGpsOwnerRel.belongsTo(ibeaconDevice, { as: "id_ibeacon_deviceIbeaconDevice", foreignKey: "id_ibeacon_device" });
  ibeaconDevice.hasMany(ibeaconGpsOwnerRel, { as: "ibeaconGpsOwnerRels", foreignKey: "id_ibeacon_device"});
  ibeaconDeviceTrack.belongsTo(ibeaconGateway, { as: "id_ibeacon_gatewayIbeaconGateway", foreignKey: "id_ibeacon_gateway" });
  ibeaconGateway.hasMany(ibeaconDeviceTrack, { as: "ibeaconDeviceTracks", foreignKey: "id_ibeacon_gateway"});
  geofence.belongsTo(owner, { as: "id_ownerOwner", foreignKey: "id_owner"});
  owner.hasMany(geofence, { as: "geofences", foreignKey: "id_owner"});
  ibeaconGpsOwnerRel.belongsTo(owner, { as: "id_ownerOwner", foreignKey: "id_owner"});
  owner.hasMany(ibeaconGpsOwnerRel, { as: "ibeaconGpsOwnerRels", foreignKey: "id_owner"});
  userOwnerRel.belongsTo(owner, { as: "id_ownerOwner", foreignKey: "id_owner"});
  owner.hasMany(userOwnerRel, { as: "userOwnerRels", foreignKey: "id_owner"});
  users.belongsTo(role, { as: "idRoleRole", foreignKey: "idRole"});
  role.hasMany(users, { as: "users", foreignKey: "idRole"});
  userOwnerRel.belongsTo(users, { as: "idUsersUser", foreignKey: "idUsers"});
  users.hasMany(userOwnerRel, { as: "userOwnerRels", foreignKey: "idUsers"});
  ibeaconGateway.hasMany(calibracionGateway, { as: 'calibracionGateways' });
  calibracionGateway.belongsTo(ibeaconGateway);

  return {
    geofence,
    gpsDevice,
    gpsDeviceTrack,
    ibeaconDevice,
    ibeaconDeviceTrack,
    ibeaconGateway,
    ibeaconGpsOwnerRel,
    owner,
    role,
    userOwnerRel,
    users,
    calibracionGateway,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
