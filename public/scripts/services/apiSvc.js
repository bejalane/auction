app.service('apiSvc', function() {
    
	this.environment = '/api/';
	this.backofficeEnvironment = '/api/backoffice/'

	this.url = {
		registration: 'register',
		login: 'authenticate',
		test: 'test',
		logout: 'logout',
		test2: 'dashboard'
	}

	this.backofficeRoutes = {
		login: 'login',
		logout: 'logout',
		addNewCatalogue: 'catalogue/addNewCatalogue'
	}

});