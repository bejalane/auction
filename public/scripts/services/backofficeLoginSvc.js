app.service('backofficeLoginSvc', ['$http', 'apiSvc', '$q', '$cookies', 'localStorageService', function($http, apiSvc, $q, $cookies, localStorageService) {
    
	this.login = function(user){
		var defer = $q.defer();

		$http({
		    method: 'POST',
		    data: user,
		    url: apiSvc.backofficeEnvironment + apiSvc.backofficeRoutes.login,
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
		    method: 'GET',
		    url: apiSvc.backofficeEnvironment + apiSvc.backofficeRoutes.checkLoggedIn,
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
		    url: apiSvc.backofficeEnvironment + apiSvc.backofficeRoutes.logout,
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

}]);