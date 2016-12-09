app.directive('login', function() {
return {
    templateUrl: 'pages/login.html',
    restrict: 'E',
    scope: {},
    controller: 'loginCtrl',
    controllerAs: 'login'
  }
});