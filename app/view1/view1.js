'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'EventManager', '$location', 'localStorageService', function($scope, EventManager, $location, localStorageService) {
    if (!firebase.auth().currentUser) {
        $location.path('/login');
    } else {
        $location.path('/view1');
    }

    $scope.eventList = [];
    // console.log($rootScope.currentUser);

    fetchEvents();
    function fetchEvents() {
        var ref = firebase.database().ref('/events');
        ref.once('value').then(function(snapshot) {
            var eventList = snapshot.val();
            for (var key in eventList) {
                if (eventList.hasOwnProperty(key)) {
                    $scope.eventList.push({
                        name: eventList[key].name,
                        place: eventList[key].place,
                        hour: new Date(eventList[key].hour),
                        participants: eventList[key].participants
                    });
                    console.log($scope.eventList);
                    $scope.$apply();
                }
            }
        });
  }

  $scope.clickJoinEvent = function(event) {
      function checkDuplicate(participants) {
          for (var i = 0; i < participants.length; i++) {
              if (localStorageService.get('email') === participants[i]) {
                  return true;
              }
          }

          return false;
      }

      console.log(checkDuplicate(event.participants));

      if (false === checkDuplicate(event.participants)) {
          event.participants.push(localStorageService.get('email'));
      }

      var postData = {
          name: event.name,
          hour: event.hour,
          place: event.place,
          participants: event.participants
      };

      // var newPostKey = firebase.database().ref().child('events').push().key;

      var updates = {};
      updates['/events/' + event.name] = postData;

      return firebase.database().ref().update(updates);
  }
}]);
