(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&',
			nothing: '<'
    },
    controller: NarrowItDownController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
	menu.nothing = false;

  menu.getMatchedMenuItems = function (searchTerm) {
		if(searchTerm == "" || searchTerm == undefined){
			menu.nothing = true;
		}
		else{
		menu.nothing = false;
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (response) {
			menu.found = response;
			if(menu.found.length == 0){
				menu.nothing = true;
			}
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
menu.removeItem = function(index){
		menu.found.splice(index,1);
	}
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function (result){
			var foundItems = [];
			var allItems = result.data;
		  for(var property in allItems){
				if(allItems.hasOwnProperty(property)){
					for (var i = 0; i < allItems[property].length; i++) {
 							var line = allItems[property][i].name.toUpperCase();
 							if (line.includes(searchTerm.toUpperCase())){
 							  	foundItems.push(allItems[property][i].name);
 					    }
	 				 }
				}
			}
			return foundItems;
		}).catch(function(error){
			console.log(error);
		});
		return response;
  }
}

})();
