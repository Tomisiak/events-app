'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope',
    'EventManager',
    '$location',
    '$firebaseObject',
    '$firebaseArray', function($scope, EventManager, $location, $firebaseObject, $firebaseArray) {
        if (!firebase.auth().currentUser) {
            $location.path('/login');
        } else {
            $location.path('/view2');
        }

        var database = firebase.database();

        $scope.onSubmit = function(event) {
            EventManager.addToList(event);
            $location.path('/view1');
        }
}])

.factory('EventManager', ['localStorageService', function(localStorageService) {
    var eventList = [];

    return {
        addToList: function(event) {
            firebase.database().ref('events/' + event.name).set({
                name: event.name,
                place: event.place,
                hour: event.hour.toString(),
                participants: [localStorageService.get('email')]
            });
        },
        getEventList: function() {
            return eventList;
        }
    };
}]);
