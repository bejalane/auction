app.controller('homeCtrl', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';

    $scope.allproducts = [
    	{
    		id: 1,
    		url: "content/Chrysanthemum.jpg",
    		name: "Chrysanthemum",
    		season: "summer 2016",
    		seasonId: 1,
    		startPrice: 50,
            currentPrice: 50,
            reservePrice: 400,
    		currency: 'USD',
            leader: 'MarkX',
            bids: 11,
    		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In veniam, commodi quasi mollitia dicta, possimus molestiae optio eligendi? Nemo, doloremque. Accusamus cupiditate ad blanditiis recusandae quidem numquam et modi nostrum!"
    	},
    	{
    		id: 2,
    		url: "content/Desert.jpg",
    		name: "Desert",
    		season: "summer 2016",
    		seasonId: 1,
    		startPrice: 50,
            currentPrice: 50,
            reservePrice: 400,
    		currency: 'USD',
            leader: '',
            bids: 0,
    		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In veniam, commodi quasi mollitia dicta, possimus molestiae optio eligendi? Nemo, doloremque. Accusamus cupiditate ad blanditiis recusandae quidem numquam et modi nostrum!"
    	},
    	{
    		id: 3,
    		url: "content/Hydrangeas.jpg",
    		name: "Hydrangeas",
    		season: "summer 2016",
    		seasonId: 1,
    		startPrice: 50,
            currentPrice: 50,
            reservePrice: 400,
    		currency: 'USD',
            leader: 'Marry',
            bids: 22,
    		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In veniam, commodi quasi mollitia dicta, possimus molestiae optio eligendi? Nemo, doloremque. Accusamus cupiditate ad blanditiis recusandae quidem numquam et modi nostrum!"
    	},
    	{
    		id: 4,
    		url: "content/Jellyfish.jpg",
    		name: "Jellyfish",
    		season: "summer 2016",
    		seasonId: 1,
    		startPrice: 50,
            currentPrice: 50,
            reservePrice: 400,
    		currency: 'USD',
            leader: 'Jane',
            bids: 5,
    		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In veniam, commodi quasi mollitia dicta, possimus molestiae optio eligendi? Nemo, doloremque. Accusamus cupiditate ad blanditiis recusandae quidem numquam et modi nostrum!"
    	}
    ];

    $scope.currentSlide = 0;

    $scope.navSlide = function(method){
    	if(method === 'next'){
    		if($scope.currentSlide != $scope.allproducts.length - 1){
    			$scope.currentSlide = $scope.currentSlide + 1;
    		} else {
    			$scope.currentSlide = 0;
    		}
    	} else if (method === 'prev') {
    		if($scope.currentSlide > 0){
    			$scope.currentSlide = $scope.currentSlide -1;
    		} else {
    			$scope.currentSlide = $scope.allproducts.length - 1;
    		}
    	}
    }

    $scope.navToSlide = function(index){
    	$scope.currentSlide = index;
    }

    function checkReservePrice(){
        for(var i=0; i<$scope.allproducts.length; i++){
            if($scope.allproducts[i].currentPrice >= $scope.allproducts[i].reservePrice){
                $scope.allproducts[i].reservePriceReach = 'reached';
            } else {
                $scope.allproducts[i].reservePriceReach = 'not reached';
            }
        }
    }
    checkReservePrice();

    $scope.addBid = function(bid, index){
        console.log(bid);
        $scope.allproducts[index].currentPrice += bid; 
        checkReservePrice();
    }
    
});