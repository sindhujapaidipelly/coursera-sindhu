(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuList/templates/home.template.html'
  })

  .state('category', {
    url: '/category',
    templateUrl: 'src/menuList/templates/categories.template.html',
    controller: 'CategoryController as categoryList',
    resolve: {
      categories: ['MenuDataService', function(MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('items', {
    url: '/items/{itemId}',
    templateUrl: 'src/menuList/templates/items.template.html',
    controller: 'ItemsController as itemList',
    resolve: {
      items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.itemId);
      }]
    }
  })

}

})();
