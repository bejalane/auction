app.controller('loginCtrl', ['$scope', '$rootScope', '$location', 'localStorageService', 'loginSvc', '$timeout', 'userSvc', 'rootSvc', function($scope, $rootScope, $location, localStorageService, loginSvc, $timeout, userSvc, rootSvc) {

    var login = this;

    function resetInitOptions(){
        login.loginFormShow = true;
        login.registrationFormShow = false;
        login.userCreated = false;
        login.successLogin = false;
    }

    resetInitOptions();

    login.login = function(){
    	console.log(login.userLogin);
        login.loginFormShow = false;
        login.registrationFormShow = false;
        login.successLogin = true;
        
        function addLoader(){
            var z = $('.login-loggin-in').text();
            $('.login-loggin-in').text(z + '.');
        }
        $timeout(addLoader, 100);
        $timeout(addLoader, 200);
        $timeout(addLoader, 300);

    	loginSvc.login(login.userLogin).then(
        	function(res){
        		if(res.code === 0){
        			console.log(res);

                    localStorageService.set("token", JSON.stringify(res.token));
                    userSvc.setUserData(res.user);

                    $rootScope.$emit("loggedIn");

                    $timeout(function(){
                        login.closeForm();
                    }, 400);
        		}
        	},
        	function(error){
        		console.log(error);	
        	}
        );
    }

    login.getTok = function(){
    	var token = JSON.parse(localStorageService.get('token'));
    	console.log(token);
    }

    login.tokenTest = function(){
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

    login.logout = function(){
        loginSvc.logout().then(
            function(res){
                console.log(res);
                localStorageService.remove("token");
            },
            function(err){
                console.log(err);
            }
        );
    }

    login.closeForm = function(){
        $('login').hide();
        resetInitOptions();
    }

    login.stopClose = function($event){
        $event.stopPropagation();
    }

    $('.login-container-form').addClass('fadeInUp');


    /*---Registration---*/

    login.redirectToReg = function(){
        login.loginFormShow = false;
        login.registrationFormShow = true;
    }

    login.registerUser = function(){
        console.log(login.regData);
        loginSvc.registerNewUser(login.regData).then(
            function(res){
                console.log(res);
                if(res.code === 0){
                    login.loginFormShow = true;
                    login.registrationFormShow = false;
                    login.userCreated = true;
                }
            },
            function(err){
                console.log(err);
            }
        )
    }
    
    
}]);