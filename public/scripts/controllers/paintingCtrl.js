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

	paintingSvc.getBids($routeParams.painting).then(
		function(res){
			console.log(res);
			pntg.currentPrice = res.data[res.data.length-1].bid;
			pntg.leader = res.data[res.data.length-1].userName;
			pntg.previous = res.data[res.data.length-2].userName;
			pntg.newBid = angular.copy(pntg.currentPrice + 10);
		},
		function(err){
			console.log(err);
		}
	);

	pntg.setNewBid = function(){
		console.log(pntg.currentPrice);
		if(!pntg.currentPrice){
			return;
		}

		if(pntg.currentPrice >= newBid){
			return;
		}

		var bid = {};
		bid.paintingId = $routeParams.painting;
		bid.bid = pntg.newBid;
		bid.userId = 2;
		bid.userName = 'John';
		bid.date = Date.now();

		paintingSvc.setBid(bid).then(
			function(res){
				console.log(res);
			},
			function(err){
				console.log(err);
			}
		);
	}

	//MAYBE IT IS JUST FOR LOCALHOST
    function filterSrcForImg(data){
        for (var n = 0; n < data.pics.length; n++) {
            data.pics[n].path = data.pics[n].path.replace("public/", "");
        }
    }

});