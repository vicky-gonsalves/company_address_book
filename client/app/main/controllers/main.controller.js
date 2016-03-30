'use strict';

(function () {

  class MainController {

    constructor($http, NgTableParams, $location) {
      this.$http = $http;
      this.$location = $location;
      this.empCount = 0;
      this.emptyTableMsg = 'Loading...';

      this.tableParams = new NgTableParams({}, {
        counts: [],
        getData: () => {
          return $http.get('/api/employees').then((data) => {
            this.empCount = data.data.length;
            if (!this.empCount) {
              this.emptyTableMsg = 'No Data Available.';
            }
            return data.data;
          });
        }
      });
    }

    editEmployee(id) {
      this.$location.path(`employee/edit/${id}`);
    }

    viewEmployee(id) {
      this.$location.path(`employee/view/${id}`);
    }
  }

  angular.module('addressbookApp')
    .controller('MainController', MainController);

})();
