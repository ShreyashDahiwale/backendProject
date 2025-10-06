const router = require('../src/routers');
const errorHandler = require('../src/modules/errorHandler/errorHandler');
// const fileUpload = require('express-fileupload');
const responseHandler = require('../src/modules/responseHandler');

exports.expressify = (app, callback) => {
  try {
    // app.use(fileUpload());
    app.use(router);
    app.use(responseHandler);
    app.use(errorHandler);
    callback(null);
  } catch (e) {
    console.log(`expressify: ${e}`);
    callback(e);
  }
}