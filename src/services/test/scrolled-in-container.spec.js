describe('Service: scrolled-in-container', function () {

  beforeEach(module('ngNephila.services.scrolledInContainer'));

  var scrolledInContainer;

  beforeEach(inject(function (_nphScrolledInContainer_) {
    scrolledInContainer = _nphScrolledInContainer_;
  }));

  it('should fucking work', function () {
    expect(scrolledInContainer).toBeDefined();
  });

  it('should return false if not visible', function () {
    var container = {
      style: {},
      innerHeight: 400
    };
    var element = {
      style: {},
      getBoundingClientRect: function() {
        return {
          top: 4000,
          bottom: 4000
        };
      }
    };
    expect(scrolledInContainer(element, container)).toEqual(false);
  });

  it('should return true if visible', function () {
    var container = {
      style: {},
      innerHeight: 400
    };
    var element = {
      style: {},
      getBoundingClientRect: function() {
        return {
          top: 400,
          bottom: 400
        };
      }
    };
    expect(scrolledInContainer(element, container)).toEqual(true);
  });

  it('should return true if visible in container', function () {
    var container = {
      style: {},
      getBoundingClientRect: function() {
        return {
          top: 400,
          bottom: 400
        };
      }
    };
    var element = {
      style: {},
      getBoundingClientRect: function() {
        return {
          top: 400,
          bottom: 400
        };
      }
    };
    expect(scrolledInContainer(element, container)).toEqual(true);
  });

  it('should return false if not visible in container', function () {
    var container = {
      style: {},
      getBoundingClientRect: function() {
        return {
          top: 400,
          bottom: 400
        };
      }
    };
    var element = {
      style: {},
      getBoundingClientRect: function() {
        return {
          top: 1200,
          bottom: 1300
        };
      }
    };
    expect(scrolledInContainer(element, container)).toEqual(false);
  });

  it('should return false if not visible', function () {
    var container = {
      style: {},
      getBoundingClientRect: function() {
        return {
          top: 400,
          bottom: 400
        };
      }
    };
    var element = {
      style: {
        display: 'none'
      },
      getBoundingClientRect: function() {
        return {
          top: 1200,
          bottom: 1300
        };
      }
    };
    expect(scrolledInContainer(element, container)).toEqual(false);

    element.style = {
      opacity: 10,
      visibility: 'hidden'
    };
    expect(scrolledInContainer(element, container)).toEqual(false);

    element.style = {
      opacity: 0
    };
    expect(scrolledInContainer(element, container)).toEqual(false);

  });

});