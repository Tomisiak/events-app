'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope',
        'EventManager',
        '$location', function($scope, EventManager, $location) {
            if (!firebase.auth().currentUser) {
                $location.path('/login');
            } else {
                $location.path('/main');
            }

            $scope.clickLogin = function() {
                var provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider).then(function(result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    // ...
                    $location.path('/main');
                    $scope.$apply();
                }).catch(function(error) {
                    console.log('error', error);
                });
            }
        }]);
