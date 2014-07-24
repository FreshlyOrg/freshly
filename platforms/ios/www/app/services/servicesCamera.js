// JASEN: Access the device's camera
angular.module('freshly.servicesCamera', [])
  .factory('Camera', ['$q', function($q) {
    return {
      getPicture: function(options) {
        var q = $q.defer();

        navigator.camera.getPicture(function(result) {
          // Do any magic you need
          q.resolve(result);
        }, function(err) {
          q.reject(err);
        }, options);

        return q.promise;
      },
      renderPicture: function (input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
            // For app-capture.html
            $('.capturePhoto').attr('src', e.target.result);
            // For activity.html
            $('.full-image').attr('src', e.target.result);
          };

          reader.readAsDataURL(input.files[0]);
        }
      }
    };
  }]);
