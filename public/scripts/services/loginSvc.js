app.service('loginSvc', ['$http', 'apiSvc', '$q', function($http, apiSvc, $q) {
    
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

}]);