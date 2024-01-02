(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
        };
    
        return ddo;
    }

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
                console.log('Empty search term');
                return;
            }

            MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm)
                .then(function (foundItems) {
                    narrowCtrl.found = foundItems;
                    console.log('Found Items:', narrowCtrl.found);
                });
        };

        narrowCtrl.removeItem = function (index) {
            narrowCtrl.found.splice(index, 1);
            console.log('Item removed. Updated found array:', narrowCtrl.found);
        };
    }

    MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
    var service = this;

    // Update the getMatchedMenuItems method
service.getMatchedMenuItems = function (searchTerm) {
    return $http({
        method: 'GET',
        url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
    }).then(function (result) {
        console.log('API Response:', result.data);

        // Ensure result.data is an object with the expected structure
        if (result.data && result.data.A && result.data.A.menu_items) {
            var menuItems = result.data.A.menu_items;

            //console.log('menuItems:', menuItems);

            if (Array.isArray(menuItems) && menuItems.length) {
                var foundItems = [];

                // Step 11: Filter menu items based on the search term
                for (var i = 0; i < menuItems.length; i++) {
                    if (menuItems[i].description.includes(searchTerm)) {
                        foundItems.push(menuItems[i]);
                    }
                }

                console.log('foundItems:', foundItems); // Add this line

                return foundItems;
            } else {
                console.log('No menu items found.');
                return [];
            }
        } else {
            console.log('Unexpected API response structure:', result.data);
            return [];
        }
    }).catch(function (error) {
        console.error('Error fetching menu items:', error);
        throw error;
    });
};
}
})();
