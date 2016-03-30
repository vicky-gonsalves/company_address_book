'use strict';

angular.module('addressbookApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/views/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
  });
