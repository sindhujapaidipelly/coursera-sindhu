(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['items']
function ItemsController(items) {
  var itemList = this;
  itemList.menuItems = items.data.menu_items;
}

})();
