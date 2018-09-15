(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuDataService.$inject = ['$q', '$timeout', '$http', 'ApiBasePath']
function MenuDataService($q, $timeout, $http, ApiBasePath) {
  var service = this;

  // List of shopping items
  var items = [];
  var items1 = [];

  // Pre-populate a no cookie list
  /*items.push({
    name: "Sugar",
    quantity: "2 bags",
    description: "Sugar used for baking delicious umm... baked goods."
  });
  items.push({
    name: "flour",
    quantity: "1 bags",
    description: "High quality wheat flour. Mix it with water, sugar, 2 raw eggs."
  });
  items.push({
    name: "Chocolate Chips",
    quantity: "3 bags",
    description: "Put these in the dough. No reason, really. Gotta store them somewhere!"
  });

  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getItems = function () {
    var deferred = $q.defer();

    // Wait 2 seconds before returning
    $timeout(function () {
      // deferred.reject(items);
      deferred.resolve(items);
    }, 800);

    return deferred.promise;
  };*/

  service.getAllCategories = function () {
    $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    }).then(function(result){
      var categories=result.data;
      for(var i=0;i<categories.length;i++){
        items.push({
          "name": categories[i].name
        });
      }
    });
    var deferred = $q.defer();

    // Wait 2 seconds before returning
    $timeout(function () {
      // deferred.reject(items);
      deferred.resolve(items);
    }, 800);

    return deferred.promise;
  };

  service.getItemsForCategory = function (categoryShortName) {
    console.log("categoryShortName"+categoryShortName);
    $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(result1){
      var itemslist=result1.data;
      console.log("Items List"+itemslist);
      console.log("test2"+itemslist.length);
      for(var i=0;i<itemslist.length;i++){
        console.log("test3");
        console.log("categoryShortName"+categoryShortName);
        if(itemslist[i].short_name.indexOf(categoryShortName) != -1)
        items1.push({
          "name": itemslist[i].name,
          "description": itemslist[i].description
        });
      }
      console.log("ITEMS"+items1);
    });
    var deferred = $q.defer();

    // Wait 2 seconds before returning
    $timeout(function () {
      // deferred.reject(items);
      deferred.resolve(items);
    }, 800);

    return deferred.promise;
  };

}

})();
