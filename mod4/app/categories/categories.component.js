(function () {
  'use strict';

  angular.module('MenuApp')
    .component('categories', {
      templateUrl: 'app/categories/categories.template.html',
      controller: 'CategoriesController'
    });

  CategoriesController.$inject = ['MenuDataService'];
  function CategoriesController(MenuDataService) {
    var $ctrl = this;
    console.log('CategoriesController initialized');

    // Attempt to use MenuDataService
    MenuDataService.getAllCategories()
      .then(function (categories) {
        console.log('Categories data:', categories);
        $ctrl.categories = categories;
      })
      .catch(function (error) {
        console.error('Error fetching categories:', error);
      });
  }

  angular.module('MenuApp')
    .config(['$controllerProvider', function ($controllerProvider) {
      $controllerProvider.register('CategoriesController', CategoriesController);
    }]);
})();
