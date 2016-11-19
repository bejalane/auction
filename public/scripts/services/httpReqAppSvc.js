app.service('httpReqAppSvc', ['$http', 'apiSvc', '$q', '$cookies', function($http, apiSvc, $q, $cookies) {
    
    //GET
	this.get = function(url, params){
		var defer = $q.defer();
		var url;
		if(params){
			url = apiSvc.environment + apiSvc.url[url] + params;
		} else {
			url = apiSvc.environment + apiSvc.url[url];
		}
		$http({
		    method: 'GET',
		    url: url,
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

	//POST
	this.post = function(data, url){
		var defer = $q.defer();

		$http({
		    method: 'POST',
		    data: data,
		    url: apiSvc.environment + apiSvc.url[url],
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