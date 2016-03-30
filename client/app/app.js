'use strict';

angular.module('addressbookApp', [
    'addressbookApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'ngTable',
    'ngAnimate',
    'toastr',
    'oc.lazyLoad'
  ])
  .config(function ($routeProvider, $locationProvider, toastrConfig) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

    angular.extend(toastrConfig, {
      allowHtml: true,
      positionClass: 'toast-bottom-right'
    });
  });
