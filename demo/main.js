var app = angular.module('app', ['e50FileUpload']);
app.controller('MainCtrl', function($scope, $http) {
  $scope.response = false;
  $scope.errors = false;
  $scope.options = {
    url: '/demo/fakeResponse.json',
    method: 'GET',
    allowedExtensions: ['png']
  };
  $scope.callbacks = {
    onStart: function() {
      console.log('starting');
      console.log(arguments);
    },
    onSuccess: function(fileName, response, elm) {
      $scope.response = response;
    },
    onError: function() {
      $scope.errors = arguments;
    },
    onExtError: function(filename, extension) {
      $scope.errors = "File type " + extension + " not supported.";
    },
    onSizeError: function(filename, fileSize) {
      $scope.errors = "File size " + fileSize + " not supported.";
    }
  };  
});