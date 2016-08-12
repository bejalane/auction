app.service('registrationSvc', ['$http', 'apiSvc', '$q', function($http, apiSvc, $q) {
    
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