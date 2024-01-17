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
    .config(['$controllerProvider', function ($controllerProvider) {
      $controllerProvider.register('ItemsController', ItemsController);
    }]);

  function ItemsController() {
    // ItemsController logic goes here
    console.log('itemsCtrl.items : ', this)
    var itemsCtrl = this;
    console.log('Hi')
    itemsCtrl.$onChanges = function (changes) {
      if (changes.items) {
        itemsCtrl.items = changes.items.currentValue || [];
      }
    };
  }
})();
