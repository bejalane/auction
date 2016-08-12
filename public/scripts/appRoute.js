app.config(function($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : 'pages/login.html',
            controller  : 'loginCtrl'
        })

        // route for the about page
        .when('/registration', {
            templateUrl : 'pages/registration.html',
            controller  : 'registrationCtrl'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/blog.html',
            controller  : 'blogController'
        });
});