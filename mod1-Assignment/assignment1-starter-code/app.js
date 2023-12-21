(function () {
    'use strict';
    
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope){
        $scope.checkLunch =function(){
            var items = $scope.lunchMenu ? $scope.lunchMenu.trim() : "";
            
            if(!items){
                $scope.enjoyMessage = "";
                $scope.errorMessage = "Please enter data first";
                return;
            }
            var itemList = items.split(',');

            itemList = itemList.filter(function (item) {
                return item.trim() !== '';
            });

            if (itemList.length <= 3) {
                $scope.errorMessage = '';
                $scope.enjoyMessage = 'Enjoy!';
            } else {
                $scope.enjoyMessage = '';
                $scope.errorMessage = 'Too much!';
            }
        }
    }
})();