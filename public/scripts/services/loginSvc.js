app.service('loginSvc', ['$http', 'apiSvc', '$q', '$cookies', 'localStorageService', function($http, apiSvc, $q, $cookies, localStorageService) {
    
	this.login = function(user){
		var defer = $q.defer();

		console.log(user);

		$http({
		    method: 'POST',
		    data: user,
		    url: apiSvc.environment + apiSvc.url.login,
		})
		.success(function (response) {
		   	defer.resolve(response);
		})
		.error(function (error) {
		    defer.resolve(error);
		});

		return defer.promise;
	}

	this.testTok = function(){
		var defer = $q.defer();

		$http({
		    method: 'POST',
		    url: apiSvc.environment + apiSvc.url.test,
		    headers: { 'Content-Type': undefined ,'Accept': 'application/json', 'Authorization': JSON.parse(localStorageService.get('token')) },
		})
		.success(function (response) {
		   	defer.resolve(response);
		})
		.error(function (error) {
		    defer.resolve(error);
		});

		return defer.promise;
	}

	this.logout = function(){
		var defer = $q.defer();

		$http({
		    method: 'POST',
		    url: apiSvc.environment + apiSvc.url.logout,
		    headers: { 'Content-Type': undefined ,'Accept': 'application/json', 'Authorization': JSON.parse(localStorageService.get('token')) },
		})
		.success(function (response) {
		   	defer.resolve(response);
		   	localStorageService.remove("token");
		   	localStorageService.remove("user");
		})
		.error(function (error) {
		    defer.resolve(error);
		});

		return defer.promise;
	}

	this.registerNewUser = function(user){
		var defer = $q.defer();

		$http({
		    method: 'POST',
		    data: user,
		    url: apiSvc.environment + apiSvc.url.registration,
		})
		.success(function (response) {
		   	defer.resolve(response);
		})
		.error(function (error) {
		    defer.resolve(error);
		});

		return defer.promise;
	}

}]);