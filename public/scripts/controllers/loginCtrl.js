app.controller('loginCtrl', ['$scope', '$location', function($scope, $location) {
    
    $scope.redirectToReg = function(){
        $location.path('/registration');
        console.log('smth');
    }
    
}]);