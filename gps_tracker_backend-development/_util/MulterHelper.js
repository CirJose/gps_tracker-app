// const path = require('path');
// const accountfile = path.resolve(path.join(__dirname, process.env.GCS_KEYFILE));
// const multerGoogleStorage = require("multer-google-storage");
// const multer = require('multer');


// const MulterHelper = {
//     singleMulter:function(req, res, next) {
//         const archivoMulter = multer({
//             storage: multerGoogleStorage.storageEngine({
//                 bucket: "4go-images",
//                 acl: 'publicread',
//                 keyFilename: accountfile,
//                 filename: function getFilename(req, file, cb) {
//                     const path = `gps/${file.originalname}`;
//                     cb(null, path);
//                 }
//             })
//         }).single('file');

//         // manejador de errores en multer
//         archivoMulter(req, res, function (err) {
//             if (err instanceof multer.MulterError) {
//                 // A Multer error occurred when uploading.
//                 console.error(err);
//                 res.sendStatus(500);
//             } else if (err) {
//                 console.error(err);
//                 // An unknown error occurred when uploading.
//                 res.sendStatus(500);
//             }
//             // Everything went fine.
//             // req.user = payload.user;
//             // console.log(req.file);
//             next();
//         });
//     },

// }

// module.exports = MulterHelper;