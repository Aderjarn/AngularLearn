(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var toBuyCtrl = this;
        toBuyCtrl.toBuyList = ShoppingListCheckOffService.getToBuyList();

        toBuyCtrl.buyItem = function (index) {
            ShoppingListCheckOffService.buyItem(index);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var boughCtrl = this;
        boughCtrl.alreadyBoughtList = ShoppingListCheckOffService.getAlreadyBoughtList();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyList = [
            { name: ' Cookies', quantity: 10 },
            { name: ' Milk gallons', quantity: 2 },
            { name: ' Bread', quantity: 1 },
            { name: ' Eggs', quantity: 12 },
            { name: ' Bananas', quantity: 6 }
        ];

        var alreadyBoughtList = [];

        service.getToBuyList = function () {
            return toBuyList;
        };

        service.getAlreadyBoughtList = function () {
            return alreadyBoughtList;
        };

        service.buyItem = function (index) {
            var boughtItem = toBuyList.splice(index, 1)[0];
            alreadyBoughtList.push(boughtItem);

            if (toBuyList.length === 0) {
                service.everythingBoughtMessage = "Everything is bought!";
            }
            if (alreadyBoughtList.length === 0) {
                service.nothingBoughtMessage = "Nothing bought yet";
            }
        };
    }
})();