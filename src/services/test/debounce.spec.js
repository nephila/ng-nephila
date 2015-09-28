describe('Service: debounce', function () {

  beforeEach(module('ngNephila.services.debounce'));

  var debounce, $timeout;

  beforeEach(inject(function (_nphDebounce_,  _$timeout_) {
    debounce = _nphDebounce_;
    $timeout = _$timeout_;
  }));

  it('should fucking work', function () {
    expect(debounce).toBeDefined();
  });

  it('shouldnt execute immediately', function(){
    var counter = 0;
    var incr = debounce(function(){
      counter += 1;
    }, 100, false);
    expect(counter).toBe(0);
    incr();
    expect(counter).toBe(0);
  });

  it('should execute immediately', function(){
    var counter = 0;
    var incr = debounce(function(){
      counter += 1;
    }, 100, true);
    incr();
    expect(counter).toBe(1);
  });

  it('should execute after delay', function(){
    var counter = 0;
    var incr = debounce(function(){
      counter += 1;
    }, 200);
    incr();
    expect(counter).toBe(0);
    $timeout.flush(200);
    expect(counter).toBe(1);
  });

  it('should only happen once', function(){
    var counter = 0;
    var incr = debounce(function(){
      counter += 1;
    }, 200);
    incr();
    incr();
    expect(counter).toBe(0);
    $timeout.flush(200);
    expect(counter).toBe(1);
    incr();
    incr();
    $timeout.flush(200);
    expect(counter).toBe(2);
  });

});
