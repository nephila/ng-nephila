describe('Service: visible-in-container', function () {

  beforeEach(module('ngNephila.services.visibleInContainer'));

  var visibleInContainer;

  beforeEach(inject(function (_visibleInContainer_) {
    visibleInContainer = _visibleInContainer_;
  }));

  it('should fucking work', function () {
    expect(visibleInContainer).toBeDefined();
  });

  it('should return false if not visible', function () {
    var container = {
      innerHeight: 400
    };
    var element = {
      getBoundingClientRect: function() {
        return {
          top: 4000,
          bottom: 4000
        };
      }
    };
    expect(visibleInContainer(element, container)).toEqual(false);
  });

  it('should return true if visible', function () {
    var container = {
      innerHeight: 400
    };
    var element = {
      getBoundingClientRect: function() {
        return {
          top: 400,
          bottom: 400
        };
      }
    };
    expect(visibleInContainer(element, container)).toEqual(true);
  });

});