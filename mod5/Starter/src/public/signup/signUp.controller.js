(function () {
    "use strict";
  
    angular.module("public").controller("SignUpController", SignUpController);
  
    SignUpController.$inject = [ "InfoService", "$location"];
    function SignUpController( InfoService, $location) {
      var signUpCtrl = this;
      signUpCtrl.myInfo = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        favoriteDish: "",
        favoriteDishObj: {},
        registered: false,
      };
  
      signUpCtrl.errorMsg = "";
  
      signUpCtrl.savedmyInfo = InfoService.getmyInfo();
  
      signUpCtrl.submitForm = function () {
        InfoService.getFavoriteDish(signUpCtrl.myInfo.favoriteDish)
          .then((res) => {
            if (res) {
                signUpCtrl.myInfo.favoriteDishObj = res;
                signUpCtrl.myInfo.registered = true;
                $location.path('myinfo')
            }
            signUpCtrl.errorMsg = "No such menu number exists";
          })
          .catch((err) => {
            signUpCtrl.errorMsg = "Unable to fetch your favorite Dish";
            console.log(err, "err");
          });
        InfoService.saveUserData(signUpCtrl.myInfo);
      };
    }
  })();