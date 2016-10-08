'use strict';

angular.module('myApp.mainPage', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'main-page/main-page.html',
            controller: 'MainPageCtrl'
        });
    }])

    .controller('MainPageCtrl', ['$scope',
        'EventManager',
        '$location', function($scope, EventManager, $location) {
            if (!firebase.auth().currentUser) {
                $location.path('/login');
            } else {
                $location.path('/main');
            }

            $scope.clickEventList = function() {}
            $scope.clickAddEvent = function() {}
        }]);
