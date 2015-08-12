describe('Service: pagination', function () {

  beforeEach(module('ngNephila.services.pagination'));

  var pProvider;
  var paginatorFactory;

  beforeEach(function(){
    module(function(paginationProvider){
      pProvider = paginationProvider;
      paginatorFactory = pProvider.$get();
    });
  });

  beforeEach(inject());

  it('should fucking work', function () {
    expect(pProvider).toBeDefined();
    expect(paginatorFactory).toBeDefined();
  });

  it('should calculate the number of pages', function () {
    pProvider.setItemsPerPage(5);
    var paginator1 = paginatorFactory.getPaginator();
    var paginator2 = paginatorFactory.getPaginator();
    paginator1.setNumberOfItems(10);
    paginator2.setNumberOfItems(15);
    expect(paginator1.getNumberOfPages()).toEqual(2);
    expect(paginator2.getNumberOfPages()).toEqual(3);
  });

  it('should move between pages', function () {
    pProvider.setItemsPerPage(5);
    var paginator = paginatorFactory.getPaginator();
    paginator.setNumberOfItems(15);
    paginator.goToPage(1);
    expect(paginator.getCurrentPage()).toEqual(1);
    paginator.next();
    expect(paginator.getCurrentPage()).toEqual(2);
    paginator.prev();
    expect(paginator.getCurrentPage()).toEqual(1);
  });

  it('should not exceed boundaries', function () {
    pProvider.setItemsPerPage(5);
    var paginator = paginatorFactory.getPaginator();
    paginator.setNumberOfItems(15);
    paginator.goToPage(1);
    for (var i = 0 ; i < 10 ; i++) {
      paginator.next();
    }
    expect(paginator.getCurrentPage()).toEqual(3);
    for (i = 0 ; i < 40 ; i++) {
      paginator.prev();
    }
    expect(paginator.getCurrentPage()).toEqual(1);
    expect(function() {
      paginator.goToPage(45);
    }).toThrow();
  });

  it('should call the onPageChange callback', function () {
    pProvider.setItemsPerPage(5);
    var paginator = paginatorFactory.getPaginator();
    var onPageChangeObj = {
      onPageChange: function (page) {}
    };
    spyOn(onPageChangeObj, 'onPageChange');
    paginator.onPageChange(onPageChangeObj.onPageChange);
    paginator.setNumberOfItems(15);
    paginator.goToPage(2);
    expect(onPageChangeObj.onPageChange).toHaveBeenCalledWith(2);
  });

});
