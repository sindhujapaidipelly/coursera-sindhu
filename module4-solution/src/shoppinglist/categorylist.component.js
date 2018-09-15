(function () {
'use strict';

angular.module('data')
.component('shoppingList', {
  templateUrl: 'src/shoppinglist/templates/categorieslist.template.html',
  bindings: {
    items: '<'
  }
});

})();
