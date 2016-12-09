app.service('userSvc', ['$http', 'apiSvc', '$q', '$cookies', 'localStorageService', function($http, apiSvc, $q, $cookies, localStorageService) {

	this.setUserData = function(data){
		localStorageService.set("user", JSON.stringify(data));
	}

	this.getUserData = function(property){
		var user = JSON.parse(localStorageService.get("user"));
		if(!user){
			return false;
		}
		
		if(property){
			return user[property];
		} else	{
			return user;
		}
	}

}]);