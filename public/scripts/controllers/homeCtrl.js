app.controller('homeCtrl', function($scope, dataSvc, $location) {

    var home = this;

    function init(){
        dataSvc.getCatalogues().then(
            function(res){
                home.seasons = res.data;
                home.detectCurrentSeason(home.seasons);
                home.getPaintingsBySeason(home.currentSeason);
                console.log(home.seasons);
            }, 
            function(err){
                console.log(err);
            }
        )
    }

    home.getPaintingsBySeason = function(season){
        dataSvc.getPaintingsBySeason(season._id).then(
            function(res){
                console.log(res);
                if(res.code === 0){
                    home.seasonPaintings = res.data;
                    filterSrcForImg(res.data);
                }
            },
            function(err){
                console.log(err);
            }
        );
    }

    //MAYBE IT IS JUST FOR LOCALHOST
    function filterSrcForImg(data){
        for (var i = 0; i < data.length; i++) {
            for (var n = 0; n < data[i].pics.length; n++) {
                data[i].pics[n].path = data[i].pics[n].path.replace("public/", "");
                console.log(data[i].pics[n].path);
            }
        }
    }

    home.detectCurrentSeason = function(seasons){
        home.currentSeason = 1;
        var now = Date.now();
        for (var i = 0; i < seasons.length; i++) {
            if(now >= Date.parse(seasons[i].from)){
                if(now < Date.parse(seasons[i].to)){
                    home.currentSeason = seasons[i];
                    break;
                }
            }
        }
    }

    home.changeSeason = function(season){
        home.currentSeason = season;
        home.getPaintingsBySeason(home.currentSeason);
    }

    home.openPainting = function(index){
        console.log(index);
        $location.path('/painting/' + home.seasonPaintings[index].name + '/' + home.seasonPaintings[index]._id );
    }


init();














    
    // // create a message to display in our view
    // $scope.message = 'Everyone come and see how good I look!';

    // $scope.allproducts = [
    // 	{
    // 		id: 1,
    // 		url: "content/Chrysanthemum.jpg",
    // 		name: "Chrysanthemum",
    // 		season: "summer 2016",
    // 		seasonId: 1,
    // 		startPrice: 50,
    //         currentPrice: 50,
    //         reservePrice: 400,
    // 		currency: 'USD',
    //         leader: 'MarkX',
    //         bids: 11,
    // 		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In veniam, commodi quasi mollitia dicta, possimus molestiae optio eligendi? Nemo, doloremque. Accusamus cupiditate ad blanditiis recusandae quidem numquam et modi nostrum!"
    // 	},
    // 	{
    // 		id: 2,
    // 		url: "content/Desert.jpg",
    // 		name: "Desert",
    // 		season: "summer 2016",
    // 		seasonId: 1,
    // 		startPrice: 50,
    //         currentPrice: 50,
    //         reservePrice: 400,
    // 		currency: 'USD',
    //         leader: '',
    //         bids: 0,
    // 		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In veniam, commodi quasi mollitia dicta, possimus molestiae optio eligendi? Nemo, doloremque. Accusamus cupiditate ad blanditiis recusandae quidem numquam et modi nostrum!"
    // 	},
    // 	{
    // 		id: 3,
    // 		url: "content/Hydrangeas.jpg",
    // 		name: "Hydrangeas",
    // 		season: "summer 2016",
    // 		seasonId: 1,
    // 		startPrice: 50,
    //         currentPrice: 50,
    //         reservePrice: 400,
    // 		currency: 'USD',
    //         leader: 'Marry',
    //         bids: 22,
    // 		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In veniam, commodi quasi mollitia dicta, possimus molestiae optio eligendi? Nemo, doloremque. Accusamus cupiditate ad blanditiis recusandae quidem numquam et modi nostrum!"
    // 	},
    // 	{
    // 		id: 4,
    // 		url: "content/Jellyfish.jpg",
    // 		name: "Jellyfish",
    // 		season: "summer 2016",
    // 		seasonId: 1,
    // 		startPrice: 50,
    //         currentPrice: 50,
    //         reservePrice: 400,
    // 		currency: 'USD',
    //         leader: 'Jane',
    //         bids: 5,
    // 		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In veniam, commodi quasi mollitia dicta, possimus molestiae optio eligendi? Nemo, doloremque. Accusamus cupiditate ad blanditiis recusandae quidem numquam et modi nostrum!"
    // 	}
    // ];

    // $scope.currentSlide = 0;

    // $scope.navSlide = function(method){
    // 	if(method === 'next'){
    // 		if($scope.currentSlide != $scope.allproducts.length - 1){
    // 			$scope.currentSlide = $scope.currentSlide + 1;
    // 		} else {
    // 			$scope.currentSlide = 0;
    // 		}
    // 	} else if (method === 'prev') {
    // 		if($scope.currentSlide > 0){
    // 			$scope.currentSlide = $scope.currentSlide -1;
    // 		} else {
    // 			$scope.currentSlide = $scope.allproducts.length - 1;
    // 		}
    // 	}
    // }

    // $scope.navToSlide = function(index){
    // 	$scope.currentSlide = index;
    // }

    // function checkReservePrice(){
    //     for(var i=0; i<$scope.allproducts.length; i++){
    //         if($scope.allproducts[i].currentPrice >= $scope.allproducts[i].reservePrice){
    //             $scope.allproducts[i].reservePriceReach = 'reached';
    //         } else {
    //             $scope.allproducts[i].reservePriceReach = 'not reached';
    //         }
    //     }
    // }
    // checkReservePrice();

    // $scope.addBid = function(bid, index){
    //     console.log(bid);
    //     $scope.allproducts[index].currentPrice += bid; 
    //     checkReservePrice();
    // }
    
});