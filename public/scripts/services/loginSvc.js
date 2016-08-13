app.service('loginSvc', ['$http', 'apiSvc', '$q', '$cookies', function($http, apiSvc, $q, $cookies) {
    
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
		    headers: { 'Content-Type': undefined ,'Accept': 'application/json', 'Authorization': $cookies.get('token') },
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
		    headers: { 'Content-Type': undefined ,'Accept': 'application/json', 'Authorization': $cookies.get('token') },
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