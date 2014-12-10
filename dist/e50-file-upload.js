angular.module('e50Filter.tpls', []);


angular.module('e50FileUpload', []);
angular.module('e50FileUpload')
.directive('e50Upload', function() {
  return {
    restrict: 'A',
    scope: {
      options: "=?",
      callbacks: "=?"
    },
    link: function(scope, elm) {
      var btn = elm[0];
      
      function safe_tags(str) {
        return String(str)
          .replace( /&/g, '&amp;' )
          .replace( /"/g, '&quot;' )
          .replace( /'/g, '&#39;' )
          .replace( /</g, '&lt;' )
          .replace( />/g, '&gt;' );
      }

      var callbacks = {};

      callbacks.onStart = function() {
        console.log('starting');
        console.log(arguments);
      }

      callbacks.onSuccess = function() {
        console.log('successful');
        console.log(arguments);
      }

      callbacks.onError = function() {
        console.log('error occurred');
        console.log(arguments);
      }

      callbacks.onExtError = function(filename, extension) {
        console.error('Uploading ' + extension + ' not supported');
      };

      callbacks.onSizeError = function(filename, fileSize) {
        console.error('File size ' + fileSize + ' not supported');
      };

      angular.extend(callbacks, scope.callbacks);

      var defaults = {
        button: btn,
        url: "/",
        name: 'file',
        method: 'POST',
        cors: true,
        multipart: true,
        customHeaders: {
          token: "token"
        },
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

      angular.extend(defaults, scope.options);

      var uploader = new ss.SimpleUpload(defaults);
    }
  };
});