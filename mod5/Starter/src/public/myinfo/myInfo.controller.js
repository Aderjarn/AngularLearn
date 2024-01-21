(function(){
    "use strict";
    
    angular.module('public')
    .controller('InfoController', InfoController);
        
    InfoController.$inject = ['InfoService'];
    function InfoController(InfoService) {
        var infoCtrl = this;
        infoCtrl.title = 'User Info';
        infoCtrl.myInfo = InfoService.getmyInfo();
        infoCtrl.lettersOnly = function(input = 'L124') {
            return  input.match(/[a-zA-Z]+/g).toString();
        }

        infoCtrl.categoryName = infoCtrl.lettersOnly(infoCtrl.myInfo.favoriteDish)
    }
})();