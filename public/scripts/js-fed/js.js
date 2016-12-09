var oldx = 0;
$( document ).ready(function() {


function detectPicturesWidth(){
    var items = $('.home-pics-carousel').children('.item');
    var generalWidth = 0;
    for (var i = 0; i < items.length; i++) {
        var itemWidth = $(items[i]).width() + parseInt($(items[i]).css('margin-left')) + parseInt($(items[i]).css('margin-right'));
        generalWidth = generalWidth + itemWidth;
    }
    $('.home-pics-carousel').width(generalWidth);
}
detectPicturesWidth();

$('.home-pics-carousel').mousemove(function(e){ 
    var xLine = $(window).width()-100;
    var galleryLine = $('.home-pics-carousel').width();
    var conversionMove = (galleryLine-xLine-100)/(xLine-50);
    console.log(xLine);
    console.log(galleryLine);
    console.log(conversionMove);
    console.log(e.pageX)
    if((oldx - e.pageX) > 100 || (oldx - e.pageX) < -100) {
        $('.home-pics-carousel').animate({left: -(e.pageX-50)*conversionMove}, 150);
        oldx = e.pageX;
    } else {
        $('.home-pics-carousel').animate({left: -(e.pageX-50)*conversionMove}, 10);
        oldx = e.pageX;
    }
}); 


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
 //move();

// $('.home-paintings-slider').hover(
//     function(){
//         console.log('HOVER');
//     }, 
//     function(){
//         console.log('HOVER OFF');
//     }
// )

});