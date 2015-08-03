describe('Filter: titlecase', function () {

  beforeEach(module('ngNephila.filters.titlecase'));

  var titlecase;
  beforeEach(inject(function($filter) {
    titlecase = $filter('titlecase');
  }));

  it('has a titlecase filter', function () {
    expect(titlecase).not.toBeNull();
  });

  it('should uppercase first letter of each word', function () {
    expect(titlecase('my first module')).toEqual('My First Module');
    expect(titlecase('The last of the Mohicans')).toEqual('The Last Of The Mohicans');
  });

  it('should uppercase only the first letter if onlyFirst parameter is true', function () {
    expect(titlecase('my first module', true)).toEqual('My first module');
  });

});
