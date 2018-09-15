(function () {
'use strict';

angular.module('data')
.controller('CategoriesListController', CategoriesListController);


//MainShoppingListController.$inject = ['ShoppingListService'];
//function MainShoppingListController(ShoppingListService) {
CategoriesListController.$inject = ['items'];
function CategoriesListController(items) {
  var mainList = this;
  mainList.items = items;

  // mainList.$onInit = function () {
  //   ShoppingListService.getItems()
  //   .then(function (result) {
  //     mainList.items = result;
  //   });
  // };


}

})();
