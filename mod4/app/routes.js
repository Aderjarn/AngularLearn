(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        template: '<h3>Welcome to our Restaurant</h3><a ui-sref="categories">View Categories</a>'
      })
      .state('categories', {
        url: '/categories',
        templateUrl: 'app/categories/categories.template.html',
        controller: 'CategoriesController as $ctrl',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
      .state('items', {
        url: '/items/{categoryShortName}',
        templateUrl: 'app/items/items.template.html',
        controller: 'ItemsController as itemsCtrl',
        resolve: {
          items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
              .then(function (response) {
                console.log('Full response in routes.js:', response);
      
                if (Array.isArray(response) && response.length > 0) {
                  console.log('Data in routes.js:', response);
                  console.log('Menu Items in routes.js:', response);
                  return response;  // Return the raw array without wrapping it in an object
                } else {
                  console.error('Error: Invalid response data structure');
                  return [];  // Return an empty array
                }
              })
              .catch(function (error) {
                console.error('Error fetching items:', error);
                return [];  // Return an empty array
              });
          }]
        }        
      });
  }
})();
