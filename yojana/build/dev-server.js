require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var assert = require('assert')

var findRestaurants

var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID
var format = require('util').format
MongoClient.connect('mongodb://thisDOTnameDB:0ld.Traff0rd@tdn-cluster0-shard-00-00-42p2h.mongodb.net:27017,tdn-cluster0-shard-00-01-42p2h.mongodb.net:27017,tdn-cluster0-shard-00-02-42p2h.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=tDn-cluster0-shard-0&authSource=admin', function (err, db) {
    if (err) {
    console.log(' err --> ', err)
        throw err;
    } else {
        console.log("successfully connected to the database");
    }
    /*findRestaurants(db, function() {
        db.close();
    });*/

    findRestaurants = function(callback) {
      var cursor =db.collection('restaurants').find( );
      cursor.each(function(err, doc) {
          assert.equal(err, null);
          if (doc != null) {
            console.dir(doc);
          } else {
            callback();
          }
      });
    };

    //db.close();
});


var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'helloworld',
  database: 'foo'
})

connection.connect()
connection.query('SELECT * FROM bar', function (error, results, fields) {
  if (error) throw error
  console.log('DB RESPONSE :: ', typeof(results[0]), results)
})
connection.end()


var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

app.post('/auth/login', function (req, res) {
  findRestaurants(function(err) {
        console.log(' ERROR : ', err)
    });
  res.send('POST request to the homepage')
})

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
