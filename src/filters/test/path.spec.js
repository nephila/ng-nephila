describe('Filter: path', function () {

  beforeEach(module('ngNephila.filters.path'));

  var pathFilter;
  beforeEach(inject(function($filter) {
    pathFilter = $filter('path');
  }));

  it('has a path filter', function () {
    expect(pathFilter).not.toBeNull();
  });

  it('should compose paths automagically', function () {
    expect(pathFilter('http://hello.com', 'main')).toEqual('http://hello.com/main/');
    expect(pathFilter('http://hello.com/', 'main')).toEqual('http://hello.com/main/');
    expect(pathFilter('http://hello.com', '/main')).toEqual('http://hello.com/main/');
    expect(pathFilter('http://hello.com/', '/main')).toEqual('http://hello.com/main/');
    expect(pathFilter('http://hello.com/', '//main')).toEqual('http://hello.com/main/');
  });

  it('should respect noTrailingSlash parameter', function () {
    expect(pathFilter('http://hello.com', 'main')).toEqual('http://hello.com/main/');
    expect(pathFilter('http://hello.com/', 'main', true)).toEqual('http://hello.com/main');
  });

});