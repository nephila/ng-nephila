describe('Filter: strip', function () {

  beforeEach(module('ngNephila.filters.strip'));

  var stripFilter;
  beforeEach(inject(function($filter) {
    stripFilter = $filter('nphStrip');
  }));

  it('has a strip filter', function () {
    expect(stripFilter).not.toBeNull();
  });

  it('should strip string', function () {
    expect(stripFilter('//comment//', '/')).toEqual('comment');
    expect(stripFilter('/comment//', '/')).toEqual('comment');
    expect(stripFilter('  too many spaces ')).toEqual('too many spaces');
    expect(stripFilter('Hello!', '/')).toEqual('Hello!');
    expect(stripFilter('Hello!', '!')).toEqual('Hello');
  });

});