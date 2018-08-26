(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

//Controller 1
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.buyItems = ShoppingListCheckOffService.buyItems;

  toBuyList.buyItem = function (itemIndex, itemName, quantity) {
      ShoppingListCheckOffService.updateBuyItemList(itemIndex);
      ShoppingListCheckOffService.updateBoughtItemList(itemName, quantity);
    };

  toBuyList.buyFlag = function(){
      return ShoppingListCheckOffService.getBuyFlag();
    };
}

//Controller 2
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBoughtList = this;

alreadyBoughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();

alreadyBoughtList.boughtFlag = function(){
    return ShoppingListCheckOffService.getBoughtFlag();
  };
}

//Service
function ShoppingListCheckOffService() {
  var service = this;

  var buyItems = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate",
      quantity: "5"
    },
    {
      name: "Bread",
      quantity: "10"
    }
];

  var boughtItems = [];
  service.buyItems = buyItems;

  service.boughtItemsFlag;
  service.updateBuyItemList = function (itemIndex) {
    buyItems.splice(itemIndex, 1);
  };

  service.updateBoughtItemList = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    boughtItems.push(item);
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.getBuyFlag = function () {
    {
      if(buyItems.length == 0){
        return true;
      }
      else {
        return false;
      }
    }
  };

  service.getBoughtFlag = function () {
    {
      if(boughtItems.length == 0){
        return true;
      }
      else {
        return false;
      }
    }
  };
}

})();
