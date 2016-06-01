'use strict';


module.exports = function(app){
  var index = require('../controllers/index.server.controller');
  app.get('/', index.render);
};

exports.render = function(req, res){
  res.render('index', {
    title: "Hello World",
    userFullname: req.user ? req.userfullName : ''
  });
}