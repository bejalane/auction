app.service('httpBOSvc', ['$http', 'apiSvc', '$q', 'localStorageService', function($http, apiSvc, $q, localStorageService) {
    
    //GET
	this.get = function(url){
		var defer = $q.defer();

		$http({
		    method: 'GET',
		    url: apiSvc.backofficeEnvironment + apiSvc.backofficeRoutes[url],
		    headers: { 'Content-Type': 'application/json' ,'Accept': 'application/json', 'Authorization': JSON.parse(localStorageService.get('token')) },
		})
		.success(function (response) {
		   	defer.resolve(response);
		})
		.error(function (error) {
		    defer.resolve(error);
		});

		return defer.promise;
	}

	//POST
	this.post = function(data, url){
		var defer = $q.defer();

		$http({
		    method: 'POST',
		    data: data,
		    url: apiSvc.backofficeEnvironment + apiSvc.backofficeRoutes[url],
		    headers: { 'Content-Type': 'application/json' ,'Accept': 'application/json', 'Authorization': JSON.parse(localStorageService.get('token')) },
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