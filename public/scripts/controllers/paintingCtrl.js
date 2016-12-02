app.factory('mySocket', function (socketFactory) {
  return socketFactory();
})
app.controller('paintingCtrl', function($scope, $rootScope, $route, $routeParams, paintingSvc, mySocket) {

	var pntg = this;

	console.log(mySocket.test())

	mySocket.connect();

	mySocket.emit('requestBids', {id: $routeParams.painting});

	mySocket.on('bids', function(res){
		console.log('All BIDS!');
		if(res.data.length > 1){
			pntg.currentPrice = res.data[res.data.length-1].bid;
			pntg.leader = res.data[res.data.length-1].userName;
			pntg.previous = res.data[res.data.length-2].userName;
			pntg.newBid = angular.copy(pntg.currentPrice + 10);
		} else if(res.data.length > 0){
			pntg.currentPrice = res.data[res.data.length-1].bid;
			pntg.leader = res.data[res.data.length-1].userName;
			pntg.previous = null;
			pntg.newBid = angular.copy(pntg.currentPrice + 10);
		} else {
			pntg.currentPrice = pntg.price.startPrice;
			pntg.leader = 'you can be first';
			pntg.previous = null;
			pntg.newBid = angular.copy(pntg.currentPrice + 10);
		}
	});

	mySocket.on('newbids', function(res){
		console.log('NEW BID!');
		if(res.data.length > 1){
			pntg.currentPrice = res.data[res.data.length-1].bid;
			pntg.leader = res.data[res.data.length-1].userName;
			pntg.previous = res.data[res.data.length-2].userName;
			pntg.newBid = angular.copy(pntg.currentPrice + 10);
		} else {
			pntg.currentPrice = res.data[res.data.length-1].bid;
			pntg.leader = res.data[res.data.length-1].userName;
			pntg.previous = null;
			pntg.newBid = angular.copy(pntg.currentPrice + 10);
		}
	});


	$scope.$on('$locationChangeStart', function(event){
		mySocket.disconnect(true);
	});
	



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

	// paintingSvc.getBids($routeParams.painting).then(
	// 	function(res){
	// 		console.log(res);
	// 		pntg.currentPrice = res.data[res.data.length-1].bid;
	// 		pntg.leader = res.data[res.data.length-1].userName;
	// 		pntg.previous = res.data[res.data.length-2].userName;
	// 		pntg.newBid = angular.copy(pntg.currentPrice + 10);
	// 	},
	// 	function(err){
	// 		console.log(err);
	// 	}
	// );

	pntg.setNewBid = function(newBid){
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
		bid.userName = 'Kolya';
		bid.date = Date.now();

		//mySocket.emit('setNewBid', bid);

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