angular.module('ngNephila.services.pagination', [])
.provider('nphPagination', function paginationProvider() {

  var itemsPerPage = 0;

  this.setItemsPerPage = function (extItemsPerPage) {
    itemsPerPage = extItemsPerPage;
  };

  function PaginatorFactory() {
    this.getPaginator = function () {
      return new Paginator();
    };
  }

  function Paginator() {

    var numberOfItems;
    var pageChange = function(page) {};
    var currentPage = 1;

    this.onPageChange = function (pageChangeFunc) {
      pageChange = pageChangeFunc;
    };

    this.getCurrentPage = function () {
      return currentPage;
    };

    this.goToPage = function (page) {
      if (page < 1 || page > this.getNumberOfPages()) {
        throw new Error('Wrong page to go to');
      }
      currentPage = page;
      pageChange(page);
    };

    this.next = function () {
      if (currentPage + 1 <= this.getNumberOfPages()) {
        currentPage++;
      }
      pageChange(currentPage);
    };

    this.prev = function () {
      if (currentPage - 1 > 0) {
        currentPage--;
      }
      pageChange(currentPage);
    };

    this.setNumberOfItems = function (extNumberOfItems) {
      numberOfItems = extNumberOfItems;
      return numberOfItems;
    };

    this.getNumberOfPages = function () {
      return Math.ceil(numberOfItems / itemsPerPage);
    };

  }

  this.$get = function() {
    return new PaginatorFactory();
  };
});
