var tts, $timeout, $rootScope;

responsiveVoice = {
  speak: function(text, voice, opts) {
    opts.onstart.call();
    $timeout(function() {
      opts.onend.call();
    }, 100);
  },
  cancel: function() {
  },
  OnVoiceReady: null,
};

describe('Service: tts', function () {

  beforeEach(module('ngNephila.services.tts'));

  beforeEach(inject(function (_nphTts_, _$timeout_, _$rootScope_) {
    $rootScope = _$rootScope_;
    tts = _nphTts_;
    $timeout = _$timeout_;
  }));

  it('should fucking work', function () {
    expect(tts).toBeDefined();
  });

  it('should call responsiveVoice.speak on speak', function(){
    spyOn(responsiveVoice, 'speak');
    tts.speak('Hello!');
    $timeout.flush(100);
    expect(responsiveVoice.speak).toHaveBeenCalledWith(
      'Hello!', 'UK English Male',
      {
        onend: jasmine.any(Function),
        onstart: jasmine.any(Function)
      }
    );

    tts.speak('Hello!', 'UK English Female');
    $timeout.flush(100);
    expect(responsiveVoice.speak).toHaveBeenCalledWith(
      'Hello!', 'UK English Female',
      {
        onend: jasmine.any(Function),
        onstart: jasmine.any(Function)
      }
    );

    tts.speak('Hello!', 'UK English Female', {pitch: 2});
    $timeout.flush(100);
    expect(responsiveVoice.speak).toHaveBeenCalledWith(
      'Hello!', 'UK English Female',
      {
        onend: jasmine.any(Function),
        onstart: jasmine.any(Function),
        pitch: 2
      }
    );
  });

  it('should call q reject on speak exception', function() {
    var oldSpeak = responsiveVoice.speak;
    responsiveVoice.speak = function() {
      throw 'Can\'t speak';
    };
    var errored = false;
    tts.speak('Hello!')
    .then(function() {

    }, function(err) {
      errored = true;
    });
    $timeout.flush(100);
    $rootScope.$apply();
    expect(errored).toBe(true);
    responsiveVoice.speak = oldSpeak;
  });

  it('should call q resolve on speak success', function() {
    var resolved = false;
    tts.speak('Hello!')
    .then(function() {
      resolved = true;
    }, function(err) {

    });
    $timeout.flush(100);
    $rootScope.$apply();
    expect(resolved).toBe(true);
  });

  it('should call OnVoiceReady callback', function() {
    expect(tts.isReady()).toBe(false);
    var voiceCallbacks = {
      ready: function() {}
    };
    spyOn(voiceCallbacks, 'ready');
    tts.onVoiceReady(voiceCallbacks.ready);
    responsiveVoice.OnVoiceReady();
    expect(voiceCallbacks.ready).toHaveBeenCalled();
    expect(tts.isReady()).toBe(true);
  });

  it('should stop speaking correctly', function() {
    spyOn(responsiveVoice, 'cancel');
    var resolved = false;
    tts.speak('Hello!')
    .then(function() {
      resolved = true;
    }, function(err) {

    });
    tts.stop();
    $timeout.flush(100);
    $rootScope.$apply();
    expect(responsiveVoice.cancel).toHaveBeenCalled();
    expect(resolved).toBe(true);
  });

  it('should skip stop if not in progress', function() {
    spyOn(responsiveVoice, 'cancel');
    tts.stop();
    $rootScope.$apply();
    expect(responsiveVoice.cancel).not.toHaveBeenCalled();
  });

  it('should call stop if try to play during progress', function() {
    spyOn(tts, 'stop');
    tts.speak('Hello!');
    tts.speak('Hello!');
    $rootScope.$apply();
    expect(tts.stop).toHaveBeenCalled();
  });

});
