app.service('backofficeDashboardSvc', ['$http', 'apiSvc', '$q', '$cookies', function($http, apiSvc, $q, $cookies) {
    
    //Check if User Logged In
	this.checkLoggedIn = function(){
		var defer = $q.defer();

		$http({
		    method: 'GET',
		    url: apiSvc.backofficeEnvironment + apiSvc.backofficeRoutes.checkLoggedIn,
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

	//Add New Catalogue
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

	//Add New Painting
	this.addNewPainting = function(data){
		var defer = $q.defer();

		$http({
		    method: 'POST',
		    data: data,
		    url: apiSvc.backofficeEnvironment + apiSvc.backofficeRoutes.addNewPainting,
		    headers: { 'Content-Type': undefined, 'Authorization': $cookies.get('token') },
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