app.service('backofficeDashboardSvc', ['$http', 'apiSvc', '$q', '$cookies', function($http, apiSvc, $q, $cookies) {
    
	this.addNewCatalogue = function(newCatalogue){
		var defer = $q.defer();

		$http({
		    method: 'POST',
		    data: newCatalogue,
		    url: apiSvc.backofficeEnvironment + apiSvc.backofficeRoutes.addNewCatalogue,
		    headers: { 'Content-Type': 'application/json' ,'Accept': 'application/json', 'Authorization': $cookies.get('token') },
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