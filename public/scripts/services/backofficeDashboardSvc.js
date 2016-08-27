app.service('backofficeDashboardSvc', ['$http', 'apiSvc', '$q', '$cookies', 'httpBOSvc', function($http, apiSvc, $q, $cookies, httpBOSvc) {
    
    //Check if User Logged In
	this.checkLoggedIn = function(){
		return httpBOSvc.get('checkLoggedIn');
	}

	//Get all catalogues
	this.getAllCatalogues = function(){
		return httpBOSvc.get('getAllCatalogues');
	}

	//Add New Catalogue
	this.addNewCatalogue = function(newCatalogue){
		return httpBOSvc.post(newCatalogue, 'addNewCatalogue');
	}

	//Save New Paintings
	this.saveNewPaintings = function(newPaintings){
		return httpBOSvc.post(newPaintings, 'saveNewPaintings');
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