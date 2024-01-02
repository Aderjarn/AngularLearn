(function () {
    'use strict';

    angular.module('NarrowItDown',[])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json");

    NarrowItDownController.$inject=['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
        var narrowCtrl = this;
        narrowCtrl.searchTerm = '';
        narrowCtrl.found = [];

        narrowCtrl.narrowItDown = function () {
            if (narrowCtrl.searchTerm.trim() === '') {
                narrowCtrl.found = [];
                return;
            }

            MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm)
                .then(function (foundItems) {
                    narrowCtrl.found = foundItems;
                });
        };

        narrowCtrl.removeItem = function (index) {
            narrowCtrl.found.splice(index, 1);
        };
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: 'GET',
                url: ApiBasePath
            }).then(function (result) {
                var menuItems = result.data.menu_items;
                var foundItems = [];

                for (var i = 0; i < menuItems.length; i++) {
                    if (menuItems[i].description.includes(searchTerm)) {
                        foundItems.push(menuItems[i]);
                    }
                }

                return foundItems;
            });
        };
    }

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                found: '<',
                onRemove: '&'
            }
        };

        return ddo;
    }

})();