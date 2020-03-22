// model.js
const mysql      = require('mysql');
const util       = require('util');
const moment     = require('moment');
const YAML       = require('yaml');
const fs         = require('fs');
const file       = fs.readFileSync('./config.yaml', 'utf8');
var config       = YAML.parse(file);

const tName = config.tName;

var connection = mysql.createConnection({
  host     : config.dbHost,
  user     : config.dbUser,
  password : config.dbPass,
  database : config.dbName
});

exports.getStatus = function(cb) {
    var myquery = `create table if not exists nodestatus(
                       node varchar(20) primary key not null,
                       status varchar(20) not null
                   )`;

    connection.query(myquery, function(error, results, fields) {
          if(error) {
             throw error;
          }

          var mmyquery = 'SELECT node, status from nodestatus';
          connection.query(mmyquery, function (eerror, rresults, ffields) {
               if (eerror) {
                  throw eerror;
               }
               cb(rresults,null);
          }); 
    }); 
} 

exports.putStatus = function (node, cb) {
    const stmt = util.format('UPDATE nodestatus SET node=\'%s\', status=\'%s\' WHERE node=\'%s\'',node.node, node.status, node.node);
    connection.query(stmt, (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }
        cb(results,null);
    });
}

exports.putNew = function (node, cb) {
    const stmt = util.format('INSERT into nodestatus(node,status) VALUES (\'%s\',\'%s\')', node.node, node.status);
    connection.query(stmt, (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }
        cb(results,null);
    });
}
