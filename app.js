var express = require('express');
var http = require('http');
var URL = require('./url');
var app = express();
var crypto = require('crypto');
var mongoose = require('mongoose');
mongoose.connect("localhost", "shorturl");

var port = "8000"
var host = "http://localhost:8000/"

var get = function(req, res) {
  URL.findOne({alias: req.params.alias}, function(err, url){
    if(err || !url) return res.send(404);
    url.clicks++;
    url.save(function(err) {
      if(err) console.log(err);
    });
    return res.redirect(302, url.url);
  });
}

var create = function(req, res) {
  if(req.query.alias) {
    URL.findOne({alias: req.query.alias}, function(err, url) {
      if(url) return res.send(400, "Alias already in use.");
      var url = new URL(req.query);
      url.save(function(err) {
        if(err) return res.send(400, err);
        return res.send(200, host + url.alias)
      });
    });
  } else {
    var url = new URL(req.query);
    crypto.randomBytes(4, function(ex, buf) {
      var alias = buf.toString('base64');
      alias = alias.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '');
      url.alias = alias;
      url.save(function(err) {
        if(err) return res.send(400, err);
        return res.send(200, host + url.alias);
      });
    });
  }
}

app.configure(function() {
  app.use(express.bodyParser());
  app.use(app.router);

  app.get('/create', create);
  app.get('/:alias', get);
  app.use(express.static(__dirname + '/public'));
});

var appServer = http.createServer(app);

appServer.listen(port);
