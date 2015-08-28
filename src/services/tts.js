angular.module('ngNephila.services.tts', [])
.factory('tts', ['$q', function($q) {
  var ready = false;
  var readyCallback;
  var q;
  var inProgress = false;
  responsiveVoice.OnVoiceReady = function() {
    if (ready === false) {
      if (readyCallback !== undefined) {
        readyCallback.call();
      }
      ready = true;
    }
  };
  return {
    isReady: function() {
      return ready;
    },
    onVoiceReady: function(callback) {
      readyCallback = callback;
    },
    stop: function() {
      if (!inProgress) {
        return;
      }
      if (q) {
        q.resolve();
      }
      responsiveVoice.cancel();
      inProgress = false;
    },
    speak: function(text, voice, options) {
      if (inProgress) {
        this.stop();
      }
      q = $q.defer();
      if (voice === undefined) {
        voice = 'UK English Male';
      }
      if (options === undefined) {
        options = {};
      }
      options.onstart = function() {
        inProgress = true;
      };
      options.onend = function() {
        if (!inProgress) {
          return;
        }
        if (q) {
          q.resolve();
        }
      };
      try {
        responsiveVoice.speak(text, voice, options);
      } catch (err) {
        q.reject(err);
      }
      return q.promise;
    }
  };
}]);