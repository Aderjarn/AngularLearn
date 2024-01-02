// app.js

(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    // Update the NarrowItDownController
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var narrowCtrl = this;

    narrowCtrl.searchTerm = '';
    narrowCtrl.found = [];
    narrowCtrl.buttonPressed = false; // Flag to track button press

    narrowCtrl.narrowItDown = function () {
        narrowCtrl.buttonPressed = true; // Set the flag when the button is pressed

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

    // Step 10: Service method to get matched menu items
    service.getMatchedMenuItems = function (searchTerm) {
        return $http({
            method: 'GET',
            url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
        }).then(function (result) {
            // Ensure that result.data.menu_items is defined
            var menuItems = result.data.menu_items || [];

            // Check if menuItems has a length property
            if (menuItems.length) {
                var foundItems = [];

                // Step 11: Filter menu items based on the search term
                for (var i = 0; i < menuItems.length; i++) {
                    if (menuItems[i].description.includes(searchTerm)) {
                        foundItems.push(menuItems[i]);
                    }
                }

                return foundItems;
            } else {
                // Return an empty array or handle it based on your requirements
                return [];
            }
        }).catch(function (error) {
            console.error('Error fetching menu items:', error);
            throw error; // Rethrow the error for further handling if needed
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
