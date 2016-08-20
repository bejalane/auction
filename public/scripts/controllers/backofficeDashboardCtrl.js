app.controller('backofficeDashboardCtrl', ['$scope', '$location', '$cookies', 'backofficeDashboardSvc', 
	function($scope, $location, $cookies, backofficeDashboardSvc) {
    
    function init(){
        backofficeDashboardSvc.checkLoggedIn().then(
            function(response){
                console.log(response);
                if(response.innerCode !== 0){
                    $cookies.remove('token');
                    $cookies.remove('loggedInAsAdmin');
                    $location.path('/backoffice/login');
                }
            },
            function(error){
                console.log(error);
            }
        );
    }
    init();

    $scope.addNewCatalogue = function(){
    	var newCatalogue = $scope.newCatalogue;
    	console.log(newCatalogue);
    	backofficeDashboardSvc.addNewCatalogue(newCatalogue).then(
    		function(response){
    			console.log(response);
    		},
    		function(err){
    			console.log(err);
    		}
    	);
    }

    //upload image
    $scope.stepsModel = [];

    $scope.imageUpload = function(event){
        var files = event.target.files; //FileList object
        $scope.picFiles= files;
        console.log($scope.picFiles);
         
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
                var reader = new FileReader();
                reader.onload = (function(f) {
			        return function(e) {
			            $scope.$apply(function() {
			            	var img = new Image;
                        	img.src = URL.createObjectURL(f);
                        	img.onload = function() {
                        		var newPicture = {};
                        		newPicture.width = this.width;
                        		newPicture.height = this.height;
                        		newPicture.base64 = e.target.result;
			            		newPicture.name = f.name;
			            		newPicture.type = f.type;
			            		newPicture.weight = f.size/1000000 + ' mb';
			            		$scope.addPic(newPicture);
                        	}
				        });
			        };
			    })(file);
                reader.readAsDataURL(file);
        }
    }

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.stepsModel.push(e.target.result);
        });
    }

    $scope.addPic = function(pic){
    	$scope.$apply(function() {
	    	$scope.stepsModel.push(pic);
    	});
    }

    $scope.removeImg = function(index){
    	$scope.stepsModel.splice(index, 1);
    }

    $scope.makeMainImage = function(index){
    	for(var i=0; i<$scope.stepsModel.length; i++){
    		$scope.stepsModel[i].main = false;
    	}
    	$scope.stepsModel[index].main = true;
    }

    $scope.addNewPainting = function(){
        var arr = Object.keys($scope.picFiles).map(function (key) {return $scope.picFiles[key]});

        console.log(arr);
        console.log($scope.stepsModel);

        for(var n=0; n<arr.length; n++){
            var firstObject = $scope.stepsModel[n];
            var secondObject = arr[n];
            for (var prop in firstObject) {
                if(prop != "base64"){
                    if (firstObject.hasOwnProperty(prop)) {
                        secondObject[prop] = firstObject[prop];
                    }
                }
            }
        }

        console.log(arr);

        var fd = new FormData();
        for (var i = 0; i < arr.length; i++) {
            fd.append("paintings", arr[i]);
        }

        backofficeDashboardSvc.addNewPainting(fd).then(
            function(response){
                console.log(response);
            },
            function(err){
                console.log(err);
            }
        );
    }

    
}]);