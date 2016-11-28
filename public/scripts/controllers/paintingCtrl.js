app.controller('paintingCtrl', function($scope, $route, $routeParams, paintingSvc) {

	var pntg = this;
	
	pntg.title = 'HELLO!';

	console.log($routeParams);

	paintingSvc.getPainting($routeParams.painting).then(
		function(res){
			console.log(res);
			if(res.code === 0){
				filterSrcForImg(res.data.painting);
				pntg.pic = res.data.painting;
				pntg.price = res.data.price;
			}
		},
		function(err){
			console.log(err);
		}
	);

	//MAYBE IT IS JUST FOR LOCALHOST
    function filterSrcForImg(data){
        for (var n = 0; n < data.pics.length; n++) {
            data.pics[n].path = data.pics[n].path.replace("public/", "");
        }
    }

});