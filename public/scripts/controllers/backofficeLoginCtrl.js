app.controller('backofficeLoginCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'backofficeLoginSvc', function($scope, $rootScope, $location, $cookies, backofficeLoginSvc) {
    
    $rootScope.loggedInAsAdmin = false;

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

                    var expireDate = new Date();
                    expireDate.setDate(expireDate.getMinutes() + 100);
                    $cookies.put('loggedInAsAdmin', true, {'expires': expireDate});
        			$location.path('/backoffice/dashboard');
                    //$rootScope.loggedInAsAdmin = true;
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
                if(res.innerCode === 0){
                    $cookies.remove('token');
                    $cookies.remove('loggedInAsAdmin');
                }
            },
            function(err){
                console.log(err);
            }
        );
    }
    
}]);