(function(){
'use strict';
angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
	$scope.countItems = function(){
	var items = $scope.lunchItems;
	if(!items || typeof items == 'undefined'){
	$scope.txtColor = "red";
	$scope.printMessage = "Please enter data first";
	}
	else{
		items = items.split(',');
		var itemCount = 0;
		for(var i =0; i< items.length; i++){
			items[i] = items[i].replace(/\s+/,'');
			if(items[i] != ''){
				 itemCount += 1;
			}
		}
		$scope.txtColor = "green";
		if(itemCount <= 3){
			$scope.printMessage = "Enjoy!";	
		}
		else if(itemCount > 3){
			$scope.printMessage = "Too much!";
		}
	}
	};
}
})();