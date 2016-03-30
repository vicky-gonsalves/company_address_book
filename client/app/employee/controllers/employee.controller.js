'use strict';

(function () {

  class EmployeeCtrl {
    constructor($http, $routeParams, $location, toastr) {
      this.$http = $http;
      this.$location = $location;
      this.$routeParams = $routeParams;
      this.toastr = toastr;
      this.error = 'Loading Employee data...';
      this.errors = [];
      this.editMode = false;
      this.submitted = false;
      this.isProcessing = true;

      if (this.$routeParams.id) {
        this.editMode = true;
        this.$http.get(`/api/employees/${this.$routeParams.id}`).then(response => {
            this.employee = response.data;
            this.isProcessing = false;
          })
          .catch(err=> {
            this.error = 'Employee Not Found';
            this.toastr.error(this.error, 'Error');

          })
      } else {
        this.isProcessing = false;
        this.employee = {};
      }
    }

    handleError(form, err) {
      this.isProcessing = false;
      if (err.data.hasOwnProperty('validationErr')) {
        angular.forEach(err.data.validationErr, (error) => {
          let key = Object.keys(error)[0];
          form[key].$setValidity('server', false);
          this.errors[key] = error[key];
        });
      } else {
        this.error = 'Something went wrong';
        this.toastr.error(this.error, 'Error');
      }
    }

    submitEmployee(form) {
      this.submitted = true;
      if (form.$valid) {
        this.isProcessing = true;
        if (this.editMode) {
          this.$http.put(`/api/employees/${this.$routeParams.id}`, this.employee).then(() => {
              this.toastr.success('Employee updated successfully', 'Success');
              this.$location.path(`employee/view/${this.$routeParams.id}`);
            })
            .catch(err=> {
              this.handleError(form, err);
            })
        } else {
          this.$http.post('/api/employees/', this.employee).then((emp) => {
              this.toastr.success('Employee created successfully', 'Success');
              this.$location.path(`employee/view/${emp.data._id}`);
            })
            .catch(err=> {
              this.handleError(form, err);
            })
        }
      }
    }
  }

  angular.module('addressbookApp')
    .controller('EmployeeCtrl', EmployeeCtrl);
})();

