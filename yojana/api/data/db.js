'use strict';
/*global load*/
var assert = require('assert')

function dbController(app) {
    //var self = this;
    //self.app = app; 
    /*jshint validthis:true */
    var self = this;

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    MongoClient.connect('mongodb://thisDOTnameDB:0ld.Traff0rd@tdn-cluster0-shard-00-00-42p2h.mongodb.net:27017,tdn-cluster0-shard-00-01-42p2h.mongodb.net:27017,tdn-cluster0-shard-00-02-42p2h.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=tDn-cluster0-shard-0&authSource=admin', function (err, db) {
        if (err) {
        console.log(' err --> ', err)
            throw err;
        } else {
            console.log("successfully connected to the database");
        }
        findRestaurants(db, function() {
            db.close();
        });
        db.close();
    });

}

var insertDocument = function(db, callback) {
   db.collection('restaurants').insertOne( {
      "address" : {
         "street" : "2 Avenue",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ]
      },
      "borough" : "Manhattan",
      "cuisine" : "Italian",
      "grades" : [
         {
            "date" : new Date("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
         },
         {
            "date" : new Date("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
         }
      ],
      "name" : "Vella",
      "restaurant_id" : "41704620"
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });
};


var findRestaurants = function(db, callback) {
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

dbController.prototype = Object.create({
    constructor: {
        configurable: true,
        enumerable: true,
        value: dbController,
        writable: true
    }
});

dbController.prototype.setup = function() {
    var self = this;
    self.app.get('/db/connect', self.connectDB.bind(self));

    //health check API endpoint
    self.app.get('/health', function(req, res) {
        res.status(200).json({
            status: 'OK'
        });
    });
};

dbController.prototype.connectDB = function(req, res) {
    var self = this;    
};


module.exports = dbController;