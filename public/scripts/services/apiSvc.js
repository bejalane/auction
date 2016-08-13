app.service('apiSvc', function() {
    
	this.environment = '/api/';

	this.url = {
		registration: 'register',
		login: 'authenticate',
		test: 'test',
		logout: 'logout'
	}

});