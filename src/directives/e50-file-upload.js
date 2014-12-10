angular.module('e50FileUpload')
.directive('e50Upload', function() {
  return {
    restrict: 'A',
    scope: {
      options: "=?",
      callbacks: "=?"
    },
    link: function(scope, elm) {

      // set the upload button
      var uploadBtn = elm[0];

      // setup callbacks
      var callbacks = {};

      // on upload start
      callbacks.onStart = function() {
        console.log('starting');
        console.log(arguments);
      }

      // on upload success
      callbacks.onSuccess = function() {
        console.log('successful');
        console.log(arguments);
      }

      // on upload error
      callbacks.onError = function() {
        console.log('error occurred');
        console.log(arguments);
      }

      // on upload extenstion error
      callbacks.onExtError = function(filename, extension) {
        console.error('Uploading ' + extension + ' not supported');
      };

      // on upload size error
      callbacks.onSizeError = function(filename, fileSize) {
        console.error('File size ' + fileSize + ' not supported');
      };

      // Override the default callbacks
      angular.extend(callbacks, scope.callbacks);

      // default options
      var defaults = {
        button: uploadBtn,
        url: "/",
        name: 'file',
        method: 'POST',
        cors: true,
        multipart: true,
        customHeaders: {},
        maxSize: 500,
        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
        accept: '*/*',
        hoverClass: 'btn-hover',
        responseType: 'json',
        onExtError: function(filename, extension) {
          callbacks.onExtError.apply(null, arguments);
          scope.$apply();
        },
        onSizeError: function(filename, fileSize) {
          callbacks.onSizeError.apply(null, arguments);
          scope.$apply();
        },
        startXHR: function() {
          callbacks.onStart.apply(null, arguments);
          scope.$apply();
        },
        onComplete: function(filename, response) {
          callbacks.onSuccess.apply(null, arguments);
          scope.$apply();
        },
        onError: function(fn, et, s, st, resp) {
          callbacks.onError.apply(null, arguments);
          scope.$apply();
        }
      };

      // override the default options
      angular.extend(defaults, scope.options);

      // create a new uploader
      var uploader = new ss.SimpleUpload(defaults);
    }
  };
});