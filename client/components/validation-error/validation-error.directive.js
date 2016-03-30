'use strict';

/**
 * Removes server error when user updates input
 */
angular.module('addressbookApp')
  .directive('validationError', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        element.on('keydown', () => ngModel.$setValidity('server', true));
      }
    };
  });
