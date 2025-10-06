const configFile = require('../config');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const apm = require('elastic-apm-node');
const bodyParser = require('body-parser');

let config = null;

function connections(con) {
  if (con.Connections.redis) {
    require('../src/connections/redis');
  }
  if (con.Connections.sftp) {
    const Client = require('ssh2-sftp-client');
    global.sftp = new Client();
  }
}

exports.initialize = (app, callback) => {
  configFile.createConfig((err) => {
    if (err) { callback(err); }
    else {
      config = Object.assign({}, global.gConfig);

      // connections(config);

      app.use(bodyParser.json({ limit: '50mb' }));
      app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
      app.use(apm.middleware.connect());
      app.use(cookieParser(''));

      app.use(cors({ origin: true, credentials: true }));

      app.use((req, res, next) => {
        req.response = {};
        next();
      })

      app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        if (req.method === 'OPTIONS') {
          return res.status(200).end();
        } else {
          next();
        }
      });
      
      app.use(require('../src/swagger'));
      
      app.use("/pingMe", (req, res, next) => {
        res.send(`Server is alive and uptime is: ${process.uptime()}`);
      })
      callback(null);
    }
  });
}