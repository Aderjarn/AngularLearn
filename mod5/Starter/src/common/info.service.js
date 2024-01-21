(function () {
    "use strict";
  
    angular.module("common")
    .service("InfoService", InfoService);
  
    InfoService.$inject = ['$http', 'ApiPath', '$filter']
  
    function InfoService($http, ApiPath, $filter){
      var service = this 
      service.myInfo = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          favoriteDish: '',
          registered: false
        };
        
  
      service.saveUserData = function(data){
          service.myInfo = data;
      }
  
      service.getmyInfo = function(){
        console.log(service.myInfo);
          return service.myInfo;
      }
  
  
      service.getFavoriteDish = function (menu_shortname) {
        var menu_number = menu_shortname.match(/\d+/g)-1;
        var category = menu_shortname.match(/[a-zA-Z]+/g);
        console.log(category);
        return $http.get(ApiPath +`/menu_items/${category}/menu_items/${menu_number}.json`).then(function (response) {
          return response.data;
        });
      };
    }
  })();