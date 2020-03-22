// index.js
const mymodel     = require('./model.js');
const path        = require('path');
const express     = require('express');
const util        = require('util');
const moment      = require('moment');
const app         = express();
const YAML        = require('yaml');
const fs          = require('fs');
const file        = fs.readFileSync('./config.yaml', 'utf8');
var config        = YAML.parse(file);

const port = process.env.PORT || config.appPort;
const baseurl = util.format('http://%s:%s/',config.hostip,config.appPort);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {

  mymodel.getStatus( (results) => {
     res.render('index', { "title": 'Home', "nodes": results, "baseurl": baseurl}); 
  });  
});

app.get('/node', (req, res) => {
    res.render('node', { "title": req.query.node, "baseurl":baseurl});
});


app.get('/putNew', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
 
  var nnode = JSON.parse(req.query.node);
  
  mymodel.putNew(nnode, (results) => {
     if(results) {
        mymodel.getStatus( (sresults) => {
           res.render('index', { "title": 'Home', "nodes": sresults, "baseurl": baseurl});
       });
     } 
  });
});

app.get('/setStatus', (req, res) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  var nnode = JSON.parse(req.query.node);

  mymodel.putStatus(nnode, (results) => {
    if(results) {
       mymodel.getStatus( (sresults) => {
           res.render('index', { "title": 'Home', "nodes": sresults, "baseurl": baseurl});
       });
    }
  });  
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
