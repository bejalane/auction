var oldx = 0;
var GLOBAL_flag_season_ready = true;
function GLOBAL_jqueryCustom(){
$( document ).ready(function() {

console.log('HI');

function detectPicturesWidth(){
    console.log('detectPicturesWidth');
    $('.home-pics-carousel').css('margin-right', 0);
    $('.home-pics-carousel').css('left', 'auto');
    $('.home-pics-carousel').width('100%');

    

    var items = $('.home-pics-carousel').children('.item');
    var generalWidth = 0;
    for (var i = 0; i < items.length; i++) {
        var itemWidth = $(items[i]).width() + parseInt($(items[i]).css('margin-left')) + parseInt($(items[i]).css('margin-right'));
        generalWidth = generalWidth + itemWidth;
    }
    if($(window).width() < generalWidth){
        $('.home-pics-carousel').width(generalWidth+70);
        movefunctions();
    }
    $('.home-pics-carousel').css('opacity', 1);
}
detectPicturesWidth();

function movefunctions(){
    console.log('movefunctions');
    $('.home-pics-carousel').mousemove(function(e){ 
        if(GLOBAL_flag_season_ready){
            console.log('test');
            if($(window).width() < $('.home-pics-carousel').width()){
                var xLine = $(window).width()-100;
                var galleryLine = $('.home-pics-carousel').width();
                var conversionMove = (galleryLine-xLine-100)/(xLine-50);

                if((oldx - e.pageX) > 100 || (oldx - e.pageX) < -100) {
                    $('.home-pics-carousel').animate({left: -(e.pageX-50)*conversionMove}, 150);
                    oldx = e.pageX;
                } else {
                    $('.home-pics-carousel').animate({left: -(e.pageX-50)*conversionMove}, 1);
                    oldx = e.pageX;
                }
            }
        }
    }); 
}

function move(){
    var direction = "";
    var xLine = $(window).width();
    var galleryLine = $('.home-pics-carousel').width();
    var conversionMove = galleryLine/xLine;
    var xCenter = xLine/2;

    mousemovemethod = function (e) {
 
        if (e.pageX < oldx) {
            direction = 0;
        } else if (e.pageX > oldx) {
            direction = 1;
        }
     
       console.log(direction);
    
       if(!direction){
           $('.home-pics-carousel').animate({left: -e.pageX*conversionMove+80-xLine}, 2);
        } else {
           $('.home-pics-carousel').animate({left: -e.pageX*conversionMove+80+xLine}, 2);
        }
     
        oldx = e.pageX;
     
    }

 document.addEventListener('mousemove', mousemovemethod);
 }


});

}