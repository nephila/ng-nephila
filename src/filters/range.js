angular.module('ngNephila.filters.range', [])
.filter('range', function(){
  return function(start, end, step) {
    var res = [];
    var leftToRight = true;
    if (step < 1) {
      throw new Error('Step parameter must be >= 1');
    }
    step = ( step === undefined || step === null ) ? 1 : step;
    if (end === undefined || end === null) {
      end = start;
      start = 0;
    }
    if (start > end) {
      var aux = end;
      end = start;
      start = aux;
      leftToRight = false;
    }
    for (var i = start; i < end; i+=step) {
      if (leftToRight) {
        res.push(i);
      } else {
        res.unshift(i);
      }
    }
    return res;
  };
});