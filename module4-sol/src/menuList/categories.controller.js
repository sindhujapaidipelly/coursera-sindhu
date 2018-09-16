(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryController', CategoryController);

CategoryController.$inject = ['categories']
function CategoryController(categories) {
  var categoryList = this;
  categoryList.categories_list = categories.data;
}

})();
