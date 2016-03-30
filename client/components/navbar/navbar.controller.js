'use strict';

class NavbarController {
  constructor($location) {
    this.$location = $location;
    this.isCollapsed = true;
    this.menu = [{
      'title': 'Home',
      'link': '/'
    }];
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

angular.module('addressbookApp')
  .controller('NavbarController', NavbarController);
