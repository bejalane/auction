app.service('paintingSvc', function(httpReqAppSvc) {
    
	this.getPainting = function(painting){
		var params = '/' + painting;
		return httpReqAppSvc.get('getPainting', params);
	}

	this.getBids = function(painting){
		var params = '/' + painting;
		return httpReqAppSvc.get('getBids', params);
	}

	this.setBid = function(data){
		return httpReqAppSvc.post(data, 'setBid');
	}

});