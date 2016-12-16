app.service('apiSvc', function() {
    
	this.environment = '/api/';
	this.backofficeEnvironment = '/api/backoffice/'

	this.url = {
		registration: 'register',
		login: 'authenticate',
		test: 'test',
		logout: 'logout',
		test2: 'dashboard',
		getAllCatalogues: 'catalogue/getAllCatalogues',
		getPaintingsBySeason: 'paintings/getPaintingsBySeason',
		getPainting: 'paintings/getSinglePainting',
		getBids: 'paintings/getBids',
		setBid: 'paintings/setBid',
		getSeasonPrices: 'paintings/getSeasonPaintingsPrices'
	}

	this.backofficeRoutes = {
		login: 'login',
		logout: 'logout',
		checkLoggedIn: 'checkLoggedIn',
		addNewCatalogue: 'catalogue/addNewCatalogue',
		getAllCatalogues: 'catalogue/getAllCatalogues',
		addNewPainting: 'paintings/uploadNewPainting',
		saveNewPaintings: 'paintings/saveNewPaintings'
	}

});