const { alertMessages, ibeaconAlerts, gpsDeviceTrack, ibeaconDevice } = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

const beaconFugaAlert = (sequelize) => {
  return (data) => {
    alertMessages.findOne({ where: { alert_type: "fuga" } }).then((message) => {
      ibeaconAlerts.create({
        id_ibeacon_device: data.id_ibeacon_device, // Cambiado a id_ibeacon_device
        alert_type: "fuga",
        mensaje: message.message,
      });
    });
  };
};

const beaconAgrupacionAlert = (sequelize) => {
  return async () => {
    try {
      const message = await alertMessages.findOne({
        where: {
          alert_type: "agrupacion",
        },
      });

      const clusters = await gpsDeviceTrack.findAll({
        attributes: [
          [
            sequelize.fn("ST_ClusterDBSCAN", sequelize.col("ubicacion"), 1, 20),
            "cluster_id",
          ],
        ],
        where: {
          timestamp: {
            [Op.gte]:
              sequelize.fn("NOW") - sequelize.literal("INTERVAL '1 minute'"),
          },
        },
      });

      for (const cluster of clusters) {
        const count = await gpsDeviceTrack.count({
          where: {
            [Op.and]: [
              sequelize.literal(
                `ST_ClusterDBSCAN(ubicacion, 1, 20) OVER() = ${cluster.cluster_id}`
              ),
              {
                timestamp: {
                  [Op.gte]:
                    sequelize.fn("NOW") -
                    sequelize.literal("INTERVAL '1 minute'"),
                },
              },
            ],
          },
        });

        if (count >= 20) {
          const beacons = await gpsDeviceTrack.findAll({
            attributes: ["id_ibeacon_device"],
            where: {
              [Op.and]: [
                sequelize.literal(
                  `ST_ClusterDBSCAN(ubicacion, 1, 20) OVER() = ${cluster.cluster_id}`
                ),
                {
                  timestamp: {
                    [Op.gte]:
                      sequelize.fn("NOW") -
                      sequelize.literal("INTERVAL '1 minute'"),
                  },
                },
              ],
            },
            group: "id_ibeacon_device",
          });

          for (const beacon of beacons) {
            ibeaconAlerts.create({
              id_ibeacon_device: beacon.id_ibeacon_device,
              alert_type: "agrupacion",
              message: message.message.replace("{0}", count),
            });
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const findByDates = async (req, res) => {
  const { fechaInicio, fechaFin } = req.body;
  if (!fechaInicio || !fechaFin) {
    return res
      .status(400)
      .json({ mensaje: "Debes proporcionar fecha de inicio y fecha de fin" });
  }
  const startedDate = moment(fechaInicio);
  const endDate = moment(fechaFin);

  try {
    const alertas = await ibeaconAlerts.findAll({
      include: {
        model: ibeaconDevice,
        as: "ibeaconDevice",
        attributes: ["name", "mac"],
      },
      where: {
        created_at: {
          [Op.between]: [startedDate, endDate],
        },
      },
      order: [["created_at", "DESC"]],
    });
    res.status(200).json({
      result: alertas,
      code: 200,
      message: "Ok",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener las alertas" });
  }
};

module.exports = {
  findByDates,
  beaconFugaAlert,
  beaconAgrupacionAlert,
};
