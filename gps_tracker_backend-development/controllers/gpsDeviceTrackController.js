const moment = require('moment');
const { Op, fn, col, QueryTypes } = require('sequelize');
const { gpsDeviceTrack } = require('../models');

const gpsController = {
  findByDates: (req, res) => {
    const startedDate = moment(req.body.fechaIni);
    const endDate = moment(req.body.fechaFin);
    return gpsDeviceTrack
      .findAll({
        attributes: [
          [fn('count', col('id')), 'eventos'],
          "id",
          "id_ibeacon_device",
          "lat",
          "lon",
          "name",
          "mac"        
        ],
        /* limit: 20,
        order: [['createdat', 'DESC']], */
        where: {
          createdat: { [Op.between]: [startedDate, endDate] },
        },
        group: ["id","id_ibeacon_device","createdat","lat","lon","name","mac" ],
      })
      .then(data => {
        res.status(200).json({
          result: data,
          code: 200,
          message: "Ok",
        });
      })
      .catch(err => {
        res.status(400).json({
          result: null,
          code: 400,
          message: err.message || "Ocurrió un error al persistir"
        });
      });
  },
  findDetailByDates: (req, res) => {
    const startedDate = moment(req.body.fechaIni);
    const endDate = moment(req.body.fechaFin);
    return gpsDeviceTrack
      .findAll({
        where: {
          id_ibeacon_device: req.body.id_ibeacon_device,
          timestamp: { [Op.between]: [startedDate, endDate] },
        },
      })
      .then(data => {
        res.status(200).json({
          result: data,
          code: 200,
          message: "Ok",
        });
      })
      .catch(err => {
        res.status(400).json({
          result: null,
          code: 400,
          message: err.message || "Ocurrió un error al persistir"
        });
      });
  },
  findRouteByDates: (req, res) => {
    return gpsDeviceTrack.sequelize
      .query(`SELECT id_ibeacon_device, ST_MakeLine(ST_SetSRID(ST_MakePoint(lon , lat),4326) ORDER BY "timestamp") As geom
              FROM tracking.gps_device_track
              where id_ibeacon_device = ? and timestamp between ? and ?
              GROUP BY id_ibeacon_device;`, 
              {
                replacements: [req.body.id_ibeacon_device, req.body.fechaIni, req.body.fechaFin], 
                type: QueryTypes.SELECT 
              }
      )
      .then(data => {
        res.status(200).json({
          result: data,
          code: 200,
          message: "Ok",
        });
      })
      .catch(err => {
        res.status(400).json({
          result: null,
          code: 400,
          message: err.message || "Ocurrió un error al persistir"
        });
      });
  },
};

module.exports = gpsController;
