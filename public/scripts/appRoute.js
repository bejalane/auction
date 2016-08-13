app.config(function($routeProvider) {
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
        .when('/backofficeLogin', {
            templateUrl : 'pages/backofficeLogin.html',
            controller  : 'backofficeLoginCtrl'
        });
});