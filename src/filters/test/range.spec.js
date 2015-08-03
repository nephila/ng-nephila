describe('Filter: range', function () {

  beforeEach(module('ngNephila.filters.range'));

  var range;
  beforeEach(inject(function($filter) {
    range = $filter('range');
  }));

  it('has a range filter', function () {
    expect(range).not.toBeNull();
  });

  it('should return the correct list when passing the start value', function () {
    expect(range(4)).toEqual([0, 1, 2, 3]);
  });

  it('should return the correct list when passing end and start values', function () {
    expect(range(4, 8)).toEqual([4, 5, 6, 7]);
  });

  it('should return the correct list when passing end and start values w/ end > start', function () {
    expect(range(8, 4)).toEqual([7, 6, 5, 4]);
  });

  it('should return the correct list w/ negative values', function () {
    expect(range(-4)).toEqual([-1, -2, -3, -4]);
    expect(range(-1, 1)).toEqual([-1, 0]);
    expect(range(1, -1)).toEqual([0, -1]);
  });

  it('should return consider the step when present', function () {
    expect(range(6, 12, 2)).toEqual([6, 8, 10]);
    expect(range(12, 6, 2)).toEqual([10, 8, 6]);
  });

  it('should raise an exeption if step < 1', function () {
    expect(function() {
      range(6, 12, -1);
    }).toThrow();
  });
});
