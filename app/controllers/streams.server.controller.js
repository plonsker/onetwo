'use strict';

var mongoose = require('mongoose'),
  Stream = mongoose.model('Stream');

var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

exports.create = function(req, res) {
  var stream = new Stream(req.body);

  stream.creator = req.user;

  stream.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(stream);
    }
  });
};

exports.list = function(req, res) {
  Stream.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, streams) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(streams);
    }
  });
};

exports.read = function(req, res) {
  res.json(req.stream);
};

exports.update = function(req, res) {
  var stream = req.stream;

  stream.title = req.body.title;
  stream.content = req.body.content;

  stream.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(stream);
    }
  });
};

exports.delete = function(req, res) {
  var stream = req.stream;

  stream.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(stream);
    }
  });
};

exports.streamByID = function(req, res, next, id) {
  Stream.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, stream) {
    if (err) return next(err);
    if (!stream) return next(new Error('Failed to load stream ' + id));

    req.stream = stream;

    next();
  });
};

exports.hasAuthorization = function(req, res, next) {
  if (req.stream.creator.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }

  next();
};