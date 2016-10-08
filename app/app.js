'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ui.router',
    'firebase',
    'LocalStorageModule',
    'ngCookies',
    'myApp.view1',
    'myApp.view2',
    'myApp.login',
    'myApp.version',
    'myApp.mainPage'
]).
config(['$locationProvider', '$routeProvider', 'localStorageServiceProvider', function($locationProvider, $routeProvider, localStorageServiceProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/main'});

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBA-6mzrg8Aqs-WEQGetnvZ0hTtrP89ItA",
        authDomain: "eventsapp-84d79.firebaseapp.com",
        databaseURL: "https://eventsapp-84d79.firebaseio.com",
        storageBucket: "eventsapp-84d79.appspot.com",
        messagingSenderId: "172773455829"
    };
    firebase.initializeApp(config);

    localStorageServiceProvider
        .setPrefix('myApp')
        .setStorageType('sessionStorage')
        .setNotify(true, true);
}])
.run(['$rootScope', '$location', '$cookieStore', '$http', 'localStorageService', function($rootScope, $location, $cookieStore, $http, localStorageService) {
    var user = firebase.auth().currentUser;
    console.log(user);
    if (!firebase.auth().currentUser) {
        console.log(firebase.auth().currentUser);
        $location.path('/login');
    } else {
        $location.path('/view1');
    }
    $rootScope.$apply();

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log(user);
            $rootScope.currentUser = user.email;
            $cookieStore.put('email', user.email);
            console.log(localStorageService.getStorageType()); //e.g localStorage)
            localStorageService.set('email', user.email);
        } else {
            // No user is signed in.
        }
    });
}])
.controller('MainCtrl', ['$scope', '$rootScope', '$route', '$location', function($scope, $rootScope, $route, $location) {
        console.log($location.url());

        $scope.isMain = function() {
            return '/view1' === $location.url() || '/view2' === $location.url();
        };

        $scope.logout = function() {
            $rootScope.currentUser = null;
            firebase.auth().signOut().then(function() {
                $location.path('/login');
                $scope.$apply();
            }, function(error) {
                console.log(error);
            });
        }
    }]);
