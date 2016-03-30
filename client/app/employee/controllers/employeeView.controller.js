'use strict';

(function () {

  class EmployeeViewCtrl {
    constructor($http, $routeParams, $location, Modal, toastr) {
      this.$http = $http;
      this.$location = $location;
      this.Modal = Modal;
      this.toastr = toastr;
      this.$routeParams = $routeParams;

      this.deleteConfirm = this.Modal.confirm.delete(this.removeEmployee.bind(this));

      if (this.$routeParams.id) {
        this.$http.get(`/api/employees/${this.$routeParams.id}`).then(response => {
            this.employee = response.data;
          })
          .catch(err=> {
            this.error = 'Employee Not Found';
            this.toastr.error(this.error, 'Error');
          })
      }
    }

    removeEmployee(user) {
      this.$http.delete(`/api/employees/${user._id}`).then(() => {
          this.toastr.success(`<strong>${user.empId}</strong> deleted successfully`, 'Success');
          this.$location.path('/');
        })
        .catch(err=> {
          this.error = 'Employee deletion failed';
          this.toastr.error(this.error, 'Error');
        })
    }

    editEmployee(id) {
      this.$location.path(`employee/edit/${id}`);
    }

    viewEmployee(id) {
      this.$location.path(`employee/view/${id}`);
    }
  }

  angular.module('addressbookApp')
    .controller('EmployeeViewCtrl', EmployeeViewCtrl);
})();
