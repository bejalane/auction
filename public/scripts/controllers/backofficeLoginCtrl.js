app.controller('backofficeLoginCtrl', ['$scope', '$location', '$cookies', 'backofficeLoginSvc', function($scope, $location, $cookies, backofficeLoginSvc) {
    
    $scope.redirectToReg = function(){
        $location.path('/registration');
    }

    $scope.boLogin = function(){
    	console.log($scope.userBOLogin);

    	backofficeLoginSvc.login($scope.userBOLogin).then(
        	function(response){
        		if(response.success){
        			console.log(response);
        			$cookies.put('token', response.token);
                    console.log($scope.userBOLogin.email);
        			//$location.path('/dashboard');
        		} else {
                    console.log(response);
                }
        	},
        	function(error){
        		console.log(error);	
        	}
        );
    }

    $scope.getTok = function(){
    	var token = $cookies.get('token');
    	console.log(token);
    }

    $scope.tokenTest = function(){
    	backofficeLoginSvc.testTok().then(
            function(res){
                console.log(res);
                if(res === "Unauthorized"){

                }
            },
            function(err){
                console.log(err);
            }
        );
    }

    $scope.logout = function(){
        backofficeLoginSvc.logout().then(
            function(res){
                console.log(res);
                if(res.success){
                    $cookies.remove('token');
                }
            },
            function(err){
                console.log(err);
            }
        );
    }
    
}]);