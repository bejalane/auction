app.service('paintingSvc', function(httpReqAppSvc) {
    
	this.getPainting = function(painting){
		var params = '/' + painting;
		return httpReqAppSvc.get('getPainting', params);
	}

});