app.service('rootSvc', ['loginSvc', 'localStorageService', function(loginSvc, localStorageService) {
	
	loginSvc.testTok().then(
        function(res){
            console.log(res);
            if(res.innerCode === 401){
            	localStorageService.remove("token");
            	localStorageService.remove("user");
            }
        },
        function(err){
            console.log(err);
        }
    );

}]);