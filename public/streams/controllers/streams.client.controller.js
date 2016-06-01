'use strict';

angular.module('streams').controller('StreamsController', ['$scope', '$routeParams', '$location', 'Authentication', 'Streams',
    function($scope, $routeParams, $location, Authentication, Streams) {
        $scope.authentication = Authentication;

        $scope.create = function() {
            var stream = new Streams({
                title: this.title,
                content: this.content
            });

            stream.$save(function(response) {
                $location.path('streams/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.streams = Streams.query();
        };

        $scope.findOne = function() {
            $scope.stream = Streams.get({
                streamId: $routeParams.streamId
            });
        };

        $scope.update = function() {
            $scope.stream.$update(function() {
                $location.path('streams/' + $scope.stream._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.delete = function(stream) {
            if (stream) {
                stream.$remove(function() {
                    for (var i in $scope.streams) {
                        if ($scope.streams[i] === stream) {
                            $scope.streams.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.stream.$remove(function() {
                    $location.path('streams');
                });
            }
        };
    }
]);