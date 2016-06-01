angular.module('streams').config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
    when('/streams', {
      templateUrl: 'streams/views/list-streams.client.view.html'
    }).
    when('/streams/create', {
      templateUrl: 'streams/views/create-stream.client.view.html'
    }).
    when('/streams/:streamId',{
      templateUrl: 'streams/views/view-stream.client.view.html'
    }).
    when('/streams/:streamId/edit', {
      templateUrl: 'streams/views/edit-stream.client.view.html'
    });
  }
]);