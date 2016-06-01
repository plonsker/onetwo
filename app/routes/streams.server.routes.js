'use strict';

var users = require('../../app/controllers/users.server.controller'),
    streams = require('../../app/controllers/streams.server.controller');

    module.exports = function(app){
      app.route('/api/streams')
        .get(streams.list)
        .post(users.requiresLogin, streams.create);

        app.route('/api/streams/:streamId')
          .get(streams.read)
          .put(users.requiresLogin, streams.hasAuthorization, streams.update)
          .delete(users.requiresLogin, streams.hasAuthorization, streams.delete);

        app.param('streamId', streams.streamByID);
    };