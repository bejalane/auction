app.service('dataSvc', function(httpReqAppSvc) {
    
	this.getCatalogues = function(){
		return httpReqAppSvc.get('getAllCatalogues');
	}

	this.getPaintingsBySeason = function(id){
		var params = '/' + id;
		return httpReqAppSvc.get('getPaintingsBySeason', params);
	}

});