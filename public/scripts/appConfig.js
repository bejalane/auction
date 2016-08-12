app.config(['$httpProvider', function ($httpProvider) {
	// $httpProvider.interceptors.push(function($q, $cookies) {
	//     return {
	//      'request': function(config) {

	//           config.headers['Token'] = $cookies.get('token');
	//           console.log(config.headers['Token']);
	//           return config;
	//       }
	//     };
	// });
}]);