'use strict';

angular.module('streams').factory('Streams', ['$resource', 
function($resource){
  return $resource('api/streams/:streamId', {
    streamId: '@_id'
  }, {
    update : {
      method: 'PUT'
    }
  });
}]);