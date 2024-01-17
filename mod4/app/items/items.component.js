(function () {
  'use strict';

  angular.module('MenuApp')
    .component('items', {
      templateUrl: 'app/items/items.template.html',
      controller: 'ItemsController',
      bindings: {
        items: '<'
      }
    })

  angular.module('MenuApp')
    .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['items']; // Ensure 'items' is injected correctly
  function ItemsController(items) {
    var itemsCtrl = this;
    itemsCtrl.items = items;
    console.log('ItemsController.items:', itemsCtrl.items);
  }
})();
