'use strict';

angular.module('addressbookApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/employee/edit/:id', {
        templateUrl: 'app/employee/views/employee.html',
        controller: 'EmployeeCtrl',
        controllerAs: 'emp'
      })
      .when('/employee/create', {
        templateUrl: 'app/employee/views/employee.html',
        controller: 'EmployeeCtrl',
        controllerAs: 'emp'
      })
      .when('/employee/view/:id', {
        templateUrl: 'app/employee/views/employeeView.html',
        controller: 'EmployeeViewCtrl',
        controllerAs: 'empView'
      });
  });
