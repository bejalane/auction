app.controller('loginCtrl', ['$scope', '$location', '$cookies', 'loginSvc', function($scope, $location, $cookies, loginSvc) {
    
    $scope.redirectToReg = function(){
        $location.path('/registration');
    }

    $scope.login = function(){
    	console.log($scope.userLogin);

    	loginSvc.login($scope.userLogin).then(
        	function(response){
        		if(response.success){
        			console.log(response);
        			$cookies.put('token', response.token);
        			//$location.path('/dashboard');
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
    	loginSvc.testTok().then(
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
        loginSvc.logout().then(
            function(res){
                console.log(res);
                $cookies.remove('token');
            },
            function(err){
                console.log(err);
            }
        );
    }

    $scope.tokenTest2 = function(){
        loginSvc.tokenTestSecond().then(
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
    
}]);