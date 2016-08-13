app.controller('backofficeDashboardCtrl', ['$scope', '$location', '$cookies', 'backofficeDashboardSvc', 
	function($scope, $location, $cookies, backofficeDashboardSvc) {
    
    function init(){
    	console.log($cookies.get('loggedInAsAdmin'));
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
			            		newPicture.size = f.size/1000000 + ' mb';
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

    
}]);