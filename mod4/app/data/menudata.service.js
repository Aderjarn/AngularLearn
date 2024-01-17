console.log('MenuDataService is being initialized');
(function () {
    'use strict';
  
    angular.module('DataModule')
      .service('MenuDataService', MenuDataService);
  
    MenuDataService.$inject = ['$http'];
    function MenuDataService($http) {
      console.log('MenuDataService constructor called');
      var service = this;
  
      service.getAllCategories = function () {
        return $http.get('https://coursera-jhu-default-rtdb.firebaseio.com/categories.json')
          .then(function (response) {
            console.log('Response data categories',response.data)
            return response.data;
          });
      };
  
      service.getItemsForCategory = function (categoryShortName) {
        return $http.get('https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/' + categoryShortName + '.json')
          .then(function (response) {
            console.log('Full response:', response);
            console.log('data',response.data);
            console.log('menuItems', response.data.menu_items)
            return response.data && response.data.menu_items || [];
          })
          .catch(function (error) {
            console.error('Error fetching items:', error);
            return [];
          });
      };
    }
  })();
  