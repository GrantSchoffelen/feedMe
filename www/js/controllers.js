angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Yelp, $timeout, $http) {
  
var options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

function success(pos) {
  $timeout(function(){
      var crd = pos.coords;
      console.log('Your current position is:');
      $scope.lat =  crd.latitude;
      $scope.long = crd.longitude;
      console.log(crd)
      console.log('More or less ' + crd.accuracy + ' meters.');
   $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + $scope.lat + ',' + $scope.long + '&sensor=true').then(function(res) {
                $scope.ourPosition = res.data.results[0].formatted_address
                Yelp.getYelp($scope.ourPosition)
              })
  }, 3000)
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.watchPosition(success, error, options);
 
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
