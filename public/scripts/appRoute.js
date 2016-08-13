app.config(function($routeProvider) {
    var $cookies;
  angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
    $cookies = _$cookies_;
  }]);
    $routeProvider
        // route for the login page
        .when('/', {
            templateUrl : 'pages/login.html',
            controller  : 'loginCtrl'
        })

        // route for the registration page
        .when('/registration', {
            templateUrl : 'pages/registration.html',
            controller  : 'registrationCtrl'
        })

        // route for the backoffice login page
        .when('/backoffice/login', {
            templateUrl : 'pages/backofficeLogin.html',
            controller  : 'backofficeLoginCtrl'
        })

        // route for the backoffice dashboard
        .when('/backoffice/dashboard', {
            resolve: {
                "check": function($location, $rootScope){
                    if(!$cookies.get('loggedInAsAdmin')) {
                        $location.path('/backoffice/login');
                    }
                }
            },
            templateUrl : 'pages/backofficeDashboard.html',
            controller  : 'backofficeDashboardCtrl'
        });
});