app.controller('registrationCtrl', ['$scope', 'registrationSvc', function($scope, registrationSvc) {
    
	$scope.regData = {};

    function init(){
    	console.log('This is a registration page');
    }

    init();
    
    $scope.registerUser = function(){
    	console.log($scope.regData);
    	registrationSvc.registerNewUser($scope.regData).then(
    		function(response){
    			console.log(response);
    		},
    		function(err){
    			console.log(err);
    		}
    	)
    }

}]);