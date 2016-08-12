app.controller('loginCtrl', ['$scope', '$location', 'loginSvc', function($scope, $location, loginSvc) {
    
    $scope.redirectToReg = function(){
        $location.path('/registration');
    }

    $scope.login = function(){
    	console.log($scope.userLogin);

    	loginSvc.login($scope.userLogin).then(
        	function(response){
        		console.log(response);
        	},
        	function(error){
        		console.log(error);	
        	}
        );
    }
    
}]);